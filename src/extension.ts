import * as vscode from "vscode";
import { ConfigService } from "./services/ConfigService";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "aem-dialog-replacer" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "aem-dialog-replacer.helloWorld",
    () => {
      const config = ConfigService.getInstance();


      vscode.window.showInformationMessage(
        `pass: ${config.getPassword()}; user: ${config.getUser()}; server: ${config.getServer()}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
