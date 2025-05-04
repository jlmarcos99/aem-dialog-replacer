import { Response } from "../models/Response";
import { ConfigService } from "./ConfigService";
import { PackageService } from "./PackageService";
export class AEMService {
  public static async replaceDialog(
    path: string,
    content: string
  ): Promise<Response> {
    const aemPackage = await PackageService.generateZIP(path, content);
    try {
      const response = await this.uploadPackage(aemPackage);
      if (!response.success || !response.path) {
        return response;
      }

      const installResponse = await this.installPackage(response.path);

      return installResponse;
    } catch (err) {
      return {
        success: false,
        msg: "Error while comunicating with AEM instance",
      };
    }
  }

  private static async uploadPackage(zip: ArrayBuffer): Promise<Response> {
    const config = ConfigService.getInstance()
    const uploadUrl =`${config.getServer()}/crx/packmgr/service/.json/?cmd=upload`
    const form = new FormData();

    let blob = new Blob([zip], { type: "application/zip" });

    form.append("package", blob, "archivo.zip");
    form.append("force", "true");
    form.append("install", "false");

    const response = await fetch(uploadUrl,
      {
        method: "POST",
        headers: {
          Authorization:
          "Basic " + Buffer.from(`${config.getUser()}:${config.getPassword()}`).toString("base64"),
        },
        body: form,
      }
    );


    const jsonResponse: Response = (await response.json()) as Response;
    return jsonResponse;
  }
  private static async installPackage(path: string): Promise<Response> {
    const config = ConfigService.getInstance()

    const response = await fetch(
      `${config.getServer()}/crx/packmgr/service/.json${path}?cmd=install`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${config.getUser()}:${config.getPassword()}`).toString("base64"),
        },
      }
    );

    const jsonResponse = await response.json();

    return jsonResponse as Response;
  }
}
