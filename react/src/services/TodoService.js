export default {
  getTodos: () => {
    return fetch("http://127.0.0.1/api/user/todos").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "unAuthorized" }, msgError: true };
      }
    });
  },

  postTodo: (todo) => {
    return fetch("http://127.0.0.1/api/user/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "unAuthorized" }, msgError: true };
      }
    });
  },
};
