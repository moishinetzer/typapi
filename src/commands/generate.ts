import { Command, Flags } from "@oclif/core";
import fetch from "node-fetch";

const typeOfObject = (obj: any): string => {
  let result = "";
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result += `${key}: ${typeOfObject(obj[key])};`;
    } else {
      result += `${key}: ${typeof obj[key]};`;
    }
  }

  return `{${result}}`;
};

const apiCallToType = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const json = await res.json();
  return typeOfObject(json);
};

export default class Generate extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Generate);

    const name = flags.name ?? "world";
    this.log(
      `hello ${name} from C:\\Users\\Moish\\Documents\\Repos\\typapi\\src\\commands\\generate.ts`
    );
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }

    this.log(
      await apiCallToType("https://jsonplaceholder.typicode.com/users/1")
    );
  }
}
