import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import InputField from "../../../components/InputField";
import SecondaryButton from "../../../components/SecondaryButton";
import Avatar from "../../../components/Avatar";
import { useLogin } from "../../../context/LoginProvider";
import { editProfile, getProfile, uploadUserImage, deleteProfileImage } from "../../../../api/user";

const PersonalInfoPage = ({ navigation }) => {
  const { profile, setProfile, theme, language  } = useLogin();

  console.log("Profile", profile);

  const [username, setFirstName] = useState(profile?.fullName);
  const [profession, setProfession] = useState(profile?.profession);
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);

  const handleFirstNameChange = (FirstName) => {
    setFirstName(FirstName);
  };

  const handleProfessionChange = (Profession) => {
    setProfession(Profession);
  };

  const handleSave = async () => {
    // Save all the fields
    const data = {
      fullName: username,
      profession: profession,
    };

    try {
      setError(null);
      const res = await editProfile(data);
      if (image) {
        await uploadImageHandler(image);
      }
      await getProfileHandler();
      navigation.navigate("Profile");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const getProfileHandler = async () => {
    try {
      const res = await getProfile();
      if (res.success && res.user) {
        setProfile(res.user);
      }
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  const uploadImageHandler = async (image) => {
    const formData = new FormData();
    formData.append("image", {
      name: "image.jpg",
      uri: image,
      type: "image/jpg",
    });

    try {
      const res = await uploadUserImage(formData);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteImageHandler = async () => {
    try {
      const res = await deleteProfileImage();
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}
      >
        <Avatar
          uploadImage={(image) => {
            setImage(image);
          }}
        />

        <View>
          <Text style={[styles.label, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Full Name": "Ad Soyad"}</Text>
          <InputField
            placeholder={language === "English" ? "Full Name": "Ad Soyad"}
            iconName={"user"}
            value={username}
            defaultValue={profile?.id}
            onChange={handleFirstNameChange}
            type="name"
            required={true}
          />
        </View>

        <View>
          <Text style={[styles.label, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Profession": "Meslek"}
</Text>
          <InputField
            placeholder={language === "English" ? "Profession": "Meslek"}
            iconName={"user"}
            value={profession}
            defaultValue={profile?.profession}
            onChange={handleProfessionChange}
            type="Profession"
            required={true}
          />
        </View>
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            margin: 15,
          }}
        >
          {error}
        </Text>
        <View style={styles.saveButtonContainer}>
          <SecondaryButton title={language === "English" ? "Save": "Kaydet"} onPress={handleSave} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = {
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
  },
  saveButtonContainer: {
    marginTop: 250,
  },
};

export default PersonalInfoPage;
