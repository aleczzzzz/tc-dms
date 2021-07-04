"use strict";

const Route = use("Route");

Route.group(() => {
  Route.get("/", () => {
    return "API is running";
  });

  //Auth Collection
  Route.post("auth/logIn", "AuthController.logIn").validator("Auth/LogIn");
  Route.get("auth/getSession", "AuthController.getSession").middleware("auth");
  Route.get("auth/reconnect", "AuthController.reconnect").middleware("auth");
  Route.get("auth/logOut", "AuthController.logOut");

  //Document Collection
  Route.post("document/upload", "DocumentController.upload").middleware("auth");
  Route.post("document/save", "DocumentController.save").middleware("auth");
  Route.get(
    "document/getDocumentKeys",
    "DocumentController.getDocumentKeys"
  ).middleware("auth");
  Route.post(
    "document/getDocuments",
    "DocumentController.getDocuments"
  ).middleware("auth");
  Route.post("document/getDocument", "DocumentController.getDocument")
    .middleware("auth")
    .validator("Document/getDocument");
  Route.post(
    "document/downloadFile",
    "DocumentController.downloadFile"
  ).middleware("auth");
})
  .prefix("api/v1")
  .middleware(["hits", "camelCaseKeys"]);

Route.any("*", ({ response }) => response.status(404).send());
