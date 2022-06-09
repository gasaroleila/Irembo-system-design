/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import { Camera, Upload } from "react-feather";
import { UserService } from "../../../pages/api/services/UserService";
import Button from "../authentication/button";
import { UserContext } from "../authentication/ContextProvider";
import { Toast } from "../toasts/Toast";
export function SaveSignature(): JSX.Element {
  const { user }: any = useContext(UserContext);
  const [file, setFile] = useState("");
  const [img, setImage] = useState("");
  const [loading, handleLoading] = useState<boolean>(false);
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
        let fileReponse = await userService.uploadSignature(user?.org_user_id, formData);
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
      {/* toast */}
      {status && <Toast status={status} message={message} />}
      {/* toast ends here */}

      <form
        action=""
        className=" md:w-1/3 mb-5"
        onSubmit={(e) => {
          return handleForm(e);
        }}
      >
        <div className="form-group text-dark text-sm">
          <label htmlFor="signature">
          Upload Signature <span className="text-gray-400 text-xs">(Click in the box to upload)</span>
            {/* {user?.signature_file.url} */}
            {/* <img src="http://143.110.238.227/api/v1/files/load-file?url=/opt/horizon-ita-ms/files/user-profiles/ad1ad520-ff87-4cd7-803d-8f52e6c46972-signature.png" className="w-80 h-80" alt="aa" /> */}
            <div className="border-2 w-full rounded border-dashed my-3 flex justify-center items-center lg-height p-1 text-gray-300 hover:border-primary hover:text-primary cursor-pointer hover:bg-blue-50">
              {(!file && !user?.signature_file?.path) ? (
                <Upload className="w-10 h-10" />
              ) : (
                <img
                  src={file || user?.signature_file.path}
                  alt="Featured image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </label>
          <input
            type="file"
            name=""
            id="signature"
            className="hidden"
            onChange={(e) => {
              return uploadImage(e);
            }}
          />
        </div>

        <Button title="Save" loading={loading} loadingTitle="Saving ..." disabled={file ? false : true} />
      </form>
    </div>
  );
}
