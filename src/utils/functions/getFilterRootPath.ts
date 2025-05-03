import { constants } from "../constants/Constants";

export const getFilterRootPath = (path: string): string => {
  if (!path.includes(constants.JCR_ROOT)) {
    throw new Error("Incorrect file selected!");
  }
  let rootPath = "";
  const splittedByRootPath = path.split(constants.JCR_ROOT);
  rootPath = splittedByRootPath.at(-1)!;
  const rootPathSplittedByDirectories = rootPath.split("/");
  rootPathSplittedByDirectories.pop();
  rootPath = rootPathSplittedByDirectories.join("/");
  rootPath = rootPath.replace(
    constants.CQ_DIALOG_DIRECTORY,
    constants.CQ_DIALOG_FILTER
  );

  return `<filter root="${rootPath}" mode="replace"/>`;
};
