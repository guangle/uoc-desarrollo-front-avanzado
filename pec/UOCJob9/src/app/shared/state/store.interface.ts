import { UserState } from "./user/store.user";
import { DemoState } from "./demo/store.demo";

export interface AppStore {
  users: UserState;
  demo: DemoState;
}
