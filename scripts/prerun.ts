import fs from "fs";
import path from "path";

const __dirname = path.resolve();

function readDirRecursively(
    dir: string,
    ignoreFolders: string[] = []
): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        // Check if the current path is one of the folders to ignore
        if (ignoreFolders.includes(path.basename(fullPath))) {
            return; // Skip this folder
        }

        if (stat && stat.isDirectory()) {
            results = results.concat(
                readDirRecursively(fullPath, ignoreFolders)
            );
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

function getRelativePaths(
    basePath: string,
    targetFile: string,
    ignoreFolders: string[]
): string[] {
    const absolutePaths = readDirRecursively(basePath, ignoreFolders);
    return absolutePaths.map((absPath) =>
        path.relative(path.dirname(targetFile), absPath)
    );
}

function getImportName(relativePath: string): string {
    const fileName = path.basename(relativePath, ".ts");
    if (fileName === "index") {
        const folderName = path.basename(path.dirname(relativePath));
        return `Index${
            folderName.charAt(0).toUpperCase() + folderName.slice(1)
        }`;
    }
    
    // If fileName has "-" in it, we need to convert it to camelCase
    if(fileName.includes("-")) {
        const splitFileName = fileName.split("-");
        return splitFileName.map((word, index) => {
            if (index === 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join("");
    }
    
    return fileName;
}

type FileType = "commands" | "discordEvents";

function writePathsToFile(type: FileType): void {
    let paths: string[];
    let file: string;
    let ignoreFolders: string[] = [];

    switch (type) {
        case "commands":
            ignoreFolders = ["helpers", "Helpers"];
            paths = getRelativePaths(
                path.join(__dirname, "src", "Commands"),
                path.join(
                    __dirname,
                    "src",
                    "Configs",
                    "Classes",
                    "Bot",
                    "Handlers",
                    "Commands",
                    "loadCommands.ts"
                ),
                ignoreFolders
            );
            file = path.join(
                __dirname,
                "src",
                "Configs",
                "Classes",
                "Bot",
                "Handlers",
                "Commands",
                "loadCommands.ts"
            );
            break;
        case "discordEvents":
            ignoreFolders = ["modules", "Modules", "Helpers"];
            paths = getRelativePaths(
                path.join(__dirname, "src", "Events"),
                path.join(
                    __dirname,
                    "src",
                    "Configs",
                    "Classes",
                    "Bot",
                    "Handlers",
                    "Events",
                    "loadEvents.ts"
                ),
                ignoreFolders
            );
            file = path.join(
                __dirname,
                "src",
                "Configs",
                "Classes",
                "Bot",
                "Handlers",
                "Events",
                "loadEvents.ts"
            );
            break;
    }

    const imports = paths.map((relativePath) => {
        const importName = getImportName(relativePath);
        return `import ${importName} from "./${relativePath.replace(
            /\\+/g,
            "/"
        )}";`;
    });

    const exports = paths.map((relativePath) => getImportName(relativePath));

    const fileContent = `${imports.join(
        "\n"
    )}\n\nexport default [${exports.join(", ")}];`.replaceAll(".ts", "");
    fs.writeFileSync(file, fileContent);
}

writePathsToFile("commands");
writePathsToFile("discordEvents");

console.log("Prerun finished!");