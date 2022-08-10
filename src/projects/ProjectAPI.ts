import { resolve } from "path";
import { Project } from "./Project";

const baseURL = "http://localhost:4000";
const url = `${baseURL}/projects`;
// const url = `${baseURL}/fail`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "もう一度ログインしてください";
    case 403:
      return "プロジェクトを見る権限がありません";
    default:
      return "プロジェクトの取得に失敗しました。";
  }
}

//故意にローディング時間を設ける
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

//ステータス状態をチェック
function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

//最終的にはこれが返される。
function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

const projectAPI = {
  get(page = 1, limit = 20) {
    return (
      fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        // .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModels)
        .catch((error: TypeError) => {
          console.log("log client error " + error);
          throw new Error(
            "プロジェクトの取得に失敗しました。もう一度お確かめください。"
          );
        })
    );
  },

  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: "PUT",
      body: JSON.stringify(project), //JSONに変換(JSONデータを文字列化) => 文字列にすると軽量化できる
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error" + error);
        throw new Error(
          "プロジェクトの更新時にエラーが発生しました。もう一度お確かめください。"
        );
      });
  },

  find(id: number) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel);
  },
};

export { projectAPI };
