import * as vscode from "vscode";
import { ConfigService } from "./services/ConfigService";
import { AEMService } from "./services/AEMService";
import { checkIfPathContainsADialog } from "./utils/functions/checkIfPathContainsADialog";

export function activate(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("There isn't any file opened.");
    return;
  }

  const disposable = vscode.commands.registerCommand(
    "aem-dialog-replacer.replaceAEMDialog",
    async (filePath) => {
      ConfigService.genInstance();

      filePath = filePath
        ? filePath.fsPath
        : vscode.window.activeTextEditor?.document.fileName;
      const document = editor.document;
      const content = document.getText();

      if (!checkIfPathContainsADialog(filePath)) {
        vscode.window.showErrorMessage("The opened file is not an AEM dialog");
        return;
      }

      const response = await AEMService.replaceDialog(filePath, content);

      if (!response.success) {
        vscode.window.showErrorMessage(
          `Error:
			${response.msg}`
        );
        return;
      }

      vscode.window.showInformationMessage("Dialog replaced correctly");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
