import { User } from "../../models/user.model";
import { Study } from "../../models/study.model";
import { Experience } from "../../models/experience.model";

export interface UserState {
  currentUser: User;
  currentStudy: Study;
  currentExperience: Experience;
  editMode: boolean;
}
