import { v7 } from "uuid";

export default abstract class Generator {
  public static UUID = () => {
    return v7();
  };
}
