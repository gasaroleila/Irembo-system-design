/* eslint-disable @next/next/no-img-element */
import { CameraOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { UserService } from "../../../../pages/api/services/UserService";
import { getNamesLabel } from "../../../../util/getNamesLabel";
import Button from "../../authentication/button";
import { UserContext } from "../../authentication/ContextProvider";

export default function Profile() {
  const { user }: any = useContext(UserContext);
  const [file, setFile] = useState("");
  const [img, setImage] = useState("");
  const [loading, handleLoading] = useState<Boolean>(false);
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });

  let tempFile: any;
  const uploadImage = (e: any) => {
    tempFile = e.target.files[0];
    const reader: any = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setFile(reader.result);
        setImage(tempFile);
      },
      false
    );

    if (tempFile) {
      reader.readAsDataURL(tempFile);
    }
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    try {
      handleLoading(true);
      const userService = new UserService();
      let formData = new FormData();
      formData.append("signature", img);

      if (img) {
        let fileReponse = await userService.uploadSignature(user?.id, formData);
        if (fileReponse.success) {
          handleToast({
            status: "success",
            message: fileReponse.message || "Signature saved successfully",
          });
        } else {
          handleToast({
            status: "error",
            message: fileReponse.message || "Error occured, try again",
          });
        }

        handleLoading(false);
        setTimeout(() => {
          handleToast({ status: "", message: "" });
        }, 3000);
      }
    } catch (error) {
      handleLoading(false);
      console.log("Error occured: ", error);
    }
  };

  return (
    <div>
      <form action="">
      <div className="flex gap-10 justify-center lg:justify-start">
      <label htmlFor="file">
        <div className="relative">
          <div className="w-32 h-32 bg-gray-100 rounded-full">
            {!file ? (
              <div
                className="bg-blue-50 font-bold w-32 h-32 flex items-center justify-center text-primary text-2xl rounded-full cursor-pointer"
                title="Upload profile picture"
              >
                {user?.first_name &&
                  getNamesLabel(user?.first_name, user?.last_name)}
              </div>
            ) : (
              <img
                src={file}
                alt="Featured image"
                className="w-full h-full rounded-full cursor-pointer"
              />
            )}
          </div>

          <div className="flex absolute bottom-0">
            <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <CameraOutlined />
            </div>
          </div>
        </div>
      </label>
      <input
        type="file"
        name=""
        id="file"
        onChange={(e) => {
          return uploadImage(e);
        }}
        hidden
      />

      {file && <div className="w-20">
        <Button title="save" loading={loading} loadingTitle="Saving ..." />
      </div>}
    </div>
      </form>
    </div>
  );
}
