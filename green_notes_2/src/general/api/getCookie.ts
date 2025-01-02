import axios from "axios";

// gets the session cookie (cookie named sesh) decrypted from the server
export async function getCookieFromApi(): Promise<string> {
  return axios
    .get("http://localhost:3333/cookies/getSessionCookie", {
      // For anything involving set-cookie header
      withCredentials: true,
    })
    .then(function (response) {
      //   console.log(`Response Data for cookie: ${response.data}`);
      return response.data;
    })
    .catch(function (error) {
      console.log(`Error: ${error}`);
    });
}

export async function getUserNameByUserIdCookieFromApi(): Promise<string> {
  // There was an error `named cookie not present` when I made this a post request.
  // I switched it to a get request and it fixed it????
  // Why?
  return await axios
    .get("http://localhost:3333/db/getUsernameById", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(`Response obj: ${response}`);
      return response.data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      // TODO: change to something better
    });
}

export async function getEmailByUserIdCookieFromApi(): Promise<string> {
  return await axios
    .get("http://localhost:3333/db/getEmailById", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(`Response obj: ${response}`);
      return response.data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      // TODO: change to something better
    });
}

export async function matchesPasswordInDB(
  password: string,
  email: string
): Promise<boolean> {
  return await axios
    .get("http://localhost:3333/db/matchesPassword", {
      params: {
        password,
        email,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log(`match password resp: ${resp}`);
      return resp.data;
    })
    .catch((err) => {
      console.log(`match password err: ${err}`);
      return false;
    });
}

export async function updatePasswordInDB(password: string, email: string) {
  // TODO: Handle error messages
  return await axios.post("http://localhost:3333/db/updatePassword", {
    password,
    email,
  });
}

export async function updateEmailInDB(newEmail: string, email: string) {
  // TODO: Handle error messages
  return await axios.post("http://localhost:3333/db/updateEmail", {
    newEmail,
    email,
  });
}

export async function updateUsernameInDB(username: string, email: string) {
  // TODO: Handle error messages
  return await axios.post("http://localhost:3333/db/updateUsername", {
    username,
    email,
  });
}

export async function deleteAccountInDB() {
  return await axios.get("http://localhost:3333/db/deleteAccount", {
    withCredentials: true,
  });
}

export async function deleteCookieByName(cookie_name: string) {
  return await axios.get("http://localhost:3333/cookies/deleteCookie", {
    withCredentials: true,
    params: {
      cookie_name,
    },
  });
}

export async function isEmailInTheDB(email: string) {
  return await axios
    .post("http://localhost:3333/db/emailExists", {
      email,
    })
    .then((resp) => {
      console.log(resp);
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getAmountDonatedByIdInDB() {
  return await axios
    .get("http://localhost:3333/db/getAmountDonated", {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getTreesPlantedByIdInDB() {
  return await axios
    .get("http://localhost:3333/db/getTreesPlanted", {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getAmountOfNotesByIdInDB() {
  return await axios
    .get("http://localhost:3333/db/getAmountOfNotes", {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addNewNoteToDB(title: string, noteKey: string) {
  return await axios.get("http://localhost:3333/db/addNote", {
    params: {
      title,
      noteKey,
    },
    withCredentials: true,
  });
}

export async function getAllNotesFromDB() {
  return await axios.get("http://localhost:3333/db/getAllNotesById", {
    withCredentials: true,
  });
}

export async function deleteNotesFromDB(noteId: string) {
  return await axios.get("http://localhost:3333/db/deleteNoteById", {
    params: {
      noteId,
    },
  });
}

export async function editNotesFromDB(noteId: string, title: string) {
  return await axios.get("http://localhost:3333/db/updateNoteTitle", {
    params: {
      noteId,
      title,
    },
  });
}

export async function saveNoteTextToDB(noteId: string, text: string) {
  return await axios.get("http://localhost:3333/db/updateNoteText", {
    params: {
      noteId,
      text,
    },
  });
}

export async function retrieveThyNoteFromThysDungeon(noteId: string) {
  return await axios.get("http://localhost:3333/db/getNoteText", {
    params: {
      noteId,
    },
  });
}
