import { IUser } from "../../core/types/user.types";

export type SignInMutationProps = {
  data: {
    email: string;
    password: string;
  };
};

export type SignInMutationResponse = {
  user: IUser;
  tokens: {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  };
};
