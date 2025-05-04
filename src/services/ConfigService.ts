import { workspace } from "vscode";
import { isAnyBlank } from "../utils/functions/isAnyBlank";

export class ConfigService {
  private static instance: ConfigService;

  private server: string;
  private user: string;
  private password: string;

  private constructor() {
    const config = workspace.getConfiguration("aem-dialog-replacer");

    this.server = config.get<string>("server") ?? "";
    this.user = config.get<string>("user") ?? "";
    this.password = config.get<string>("password") ?? "";

    if (isAnyBlank([this.server, this.user, this.password])) {
      throw new Error("Config not done");
    }
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  public static genInstance(): void{
    if (!ConfigService.instance) {
        ConfigService.instance = new ConfigService();
      }
  }

  public getServer(): string {
    return this.server;
  }
  public getUser(): string {
    return this.user;
  }
  public getPassword(): string {
    return this.password;
  }
}
