
import { useEffect, useState } from "react";

const CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

declare global {
  interface Window {
    gapi: any;
  }
}

export function useGoogleDrive() {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const initialize = () => {
      window.gapi.load("client:auth2", async () => {
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        });
        const isAuthed = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        setSignedIn(isAuthed);
      });
    };
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.onload = initialize;
      document.body.appendChild(script);
    } else {
      initialize();
    }
  }, []);

  const signIn = () => window.gapi.auth2.getAuthInstance().signIn().then(() => setSignedIn(true));
  const signOut = () => window.gapi.auth2.getAuthInstance().signOut().then(() => setSignedIn(false));
  const listContentFiles = async () => {
    const response = await window.gapi.client.drive.files.list({
      q: "mimeType='text/plain' and name contains 'myanmar-content-'",
      fields: "files(id,name,modifiedTime)"
    });
    return response.result.files || [];
  };
  const saveContent = async (content: string) => {
    const boundary = "-------314159265358979323846";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    const metadata = {
      name: `myanmar-content-${Date.now()}.txt`,
      mimeType: "text/plain",
    };
    const multipartRequestBody =
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: text/plain\r\n\r\n" +
      content +
      close_delim;
    await window.gapi.client.request({
      path: "/upload/drive/v3/files",
      method: "POST",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": "multipart/related; boundary=" + boundary,
      },
      body: multipartRequestBody,
    });
  };
  const downloadContent = async (fileId: string) => {
    window.gapi.client.drive.files.get({
      fileId,
      alt: "media"
    }).then((response: any) => {
      const blob = new Blob([response.body], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "content.txt";
      link.click();
    });
  };

  return { isSignedIn, signIn, signOut, saveContent, listContentFiles, downloadContent };
}
