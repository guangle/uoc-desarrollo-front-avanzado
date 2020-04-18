import { User } from "../../models/user.model";
import { Study } from "../../models/study.model";
import { Experience } from "../../models/experience.model";
import { Language } from "../../models/language.model";

export interface UserState {
  currentUser: User;
  currentStudy: Study;
  currentExperience: Experience;
  currentLanguage: Language;
  editMode: boolean;
  message: string;
}
