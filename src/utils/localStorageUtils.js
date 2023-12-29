export function saveLocalNotebook(notebook) {
  try {
    const notebookString = JSON.stringify(notebook);
    localStorage.setItem("notebook", notebookString);
  } catch (e) {
    console.log(e);
  }
}

export function getLocalNotebook() {
  try {
    return JSON.parse(localStorage.getItem("notebook"));
  } catch (e) {
    console.log(e);
  }
}
