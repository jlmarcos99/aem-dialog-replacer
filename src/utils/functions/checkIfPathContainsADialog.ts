export const checkIfPathContainsADialog = (path:string) => {

    const splittedPath = path.split('/')
    const fileWithParentFolder: string = `${splittedPath[splittedPath.length-2]}/${splittedPath[splittedPath.length-1]}`
    return fileWithParentFolder === '_cq_dialog/.content.xml'


}