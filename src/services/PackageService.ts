import JSZip from "jszip";
import { getFilterRootPath } from "../utils/functions/getFilterRootPath";

export class PackageService {


  public static async generateZIP(path: string, content: string): Promise<ArrayBuffer> {
    const zip = new JSZip();

    zip.file("META-INF/vault/filter.xml", this.getFilterXML(path));
    zip.file("META-INF/vault/properties.xml", this.getPropertiesXML());

    zip.file("jcr_root/" + path.split("jcr_root/")[1], content);

    const zipFile = await zip.generateAsync({ type: "arraybuffer" });

    return zipFile;
  }

  private static getPropertiesXML(): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>Package to replace dialogs content from Visual Studio Code</comment>
<entry key="allowIndexDefinitions">false</entry>
<entry key="name">aem-dialog-replacer</entry>
<entry key="acHandling">replace</entry>
<entry key="created">${new Date().toISOString()}</entry>
<entry key="groupId">jlmarcos99</entry>
<entry key="version">1.0.0</entry>
<entry key="packageType">content</entry>
<entry key="requiresRoot">false</entry>
<entry key="cloudManagerTarget">none</entry>
<entry key="group">pplu</entry>
<entry key="description">UI content package for WKND Sites Project</entry>
<entry key="artifactId">aem-dialog-replacer</entry>
</properties>
        `;
  }

  private static getFilterXML(path: string): string {
    const filterXML = getFilterRootPath(path);

    const filterString = `<?xml version="1.0" encoding="UTF-8"?>
    <workspaceFilter version="1.0">
        ${filterXML}            
    </workspaceFilter>    
    `;
    return filterString;
  }
}
