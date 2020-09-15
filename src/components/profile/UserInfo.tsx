import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input } from "antd";
import { WHOAMI } from "../../gql/Queries";
import { UPDATE_PROFILE } from "../../gql/Mutations";
import { UserInfoWrapper } from "../../layout/Profile";
import { any, comparePassword } from "../../utils";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const UserInfo: React.FC<Props> = ({ firstName, lastName, email, image }) => {
  const [oldPass, setOldPass] = useState<string>();
  const [newPass, setNewPass] = useState<string>("");
  const [newPassConf, setNewPassConf] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => console.log("success"),
    onError: () => console.log("error"),
    refetchQueries: [{ query: WHOAMI }],
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      oldPass,
      newPass,
      newPassConf,
      image: newImage,
    };
    if (!any(Object.values(payload))) {
      console.log("nothing was submitted");
      return;
    }
    if (!comparePassword(newPass, newPassConf)) {
      console.log("passwords don't match");
      return;
    }
    await updateProfile({ variables: { ...payload } });
  };
  return (
    <UserInfoWrapper>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <section className="profile-heading">
          <div className="image-upload">
            <label htmlFor="file-input">
              <img src={`http://127.0.0.1:4000/static/images/${image}`} />
              {newImage && <span>{newImage.name}</span>}
            </label>
            <input
              accept=".jpg,.png,.jpeg"
              style={{ display: "none" }}
              type="file"
              id="file-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <div>
            <h2>{`${firstName} ${lastName}`}</h2>
            <h3>{`${email}`}</h3>
            <h4>Software engineer</h4>
          </div>
        </section>
        <section>
          <h2>Update password</h2>
          <div>
            <Input
              type="password"
              size="large"
              id="password"
              placeholder="Old Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOldPass(e.target.value)
              }
              value={oldPass}
            />
            <Input
              type="password"
              size="large"
              id="password_1"
              placeholder="New Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPass(e.target.value)
              }
              value={newPass}
            />
            <Input
              type="password"
              size="large"
              id="password_2"
              placeholder="Confirm New Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassConf(e.target.value)
              }
              value={newPassConf}
            />
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </section>
      </form>
    </UserInfoWrapper>
  );
};

export default UserInfo;
