import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import SecondaryButton from "../../components/SecondaryButton";
import { Iconify } from "react-native-iconify";

import NoteItem from "../../components/NoteItem";
import NoteInput from "../../components/NoteInput";
import {
  createNote,
  deleteNote,
  getNotesByUserId,
  updateNote,
} from "../../../api/notes";
import { useLogin } from "../../context/LoginProvider";
import Search from "react-native-search-box";

// import expo icons
import { Ionicons } from "@expo/vector-icons";

const NotesPage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [note, setNewNote] = useState([]);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filteredData, setFilteredData] = useState(() => note);
  const { profile, theme, language } = useLogin();
  const fetchNotes = async () => {
    try {
      if (profile.id) {
        const res = await getNotesByUserId(profile.id);
        console.log("Notes:", res.notes);
        setNewNote(res.notes);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [profile.id]);

  function startAddNoteHandler() {
    setModalIsVisible(true);
  }

  function endAddNoteHandler() {
    setModalIsVisible(false);
  }

  async function addNoteHandler(title, description) {
    try {
      await createNote(title, description, profile.id);
      await fetchNotes();
      endAddNoteHandler();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNoteHandler(id) {
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }
  async function editNoteHandler(id, title, description) {
    try {
      await updateNote(id, { title, description });
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.header,
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {language === "English" ? "Notes": "Notlarım"}
        </Text>
        <TouchableOpacity
          style={{
            marginRight: 10,
            padding: 10,
          }}
          onPress={() => {
            setShowSearch(!showSearch);
            setSearch("");
          }}
        >
          <Iconify
            icon="majesticons:search-line"
            color={theme === "dark" ? "#ffffff" : "#000000"}
            size={24}
          />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View
          style={{
            width: "90%",
            marginBottom: 10,
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <Search
            onChangeText={(Text) => {
              console.log(Text);
              setSearch(Text);
            }}
            onCancel={() => {
              console.log("cancel");
              setShowSearch(false);
              setSearch("");
            }}
            backgroundColor={theme === "dark" ? "#ffffff" : "#000000"}
          />
        </View>
      )}

      <NoteInput
        visible={modalIsVisible}
        onAddNote={addNoteHandler}
        onCancel={endAddNoteHandler}
      />
      {note.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "No Notes to show": "Gösterilecek Not Yok"}</Text>
      ) : (
      <View style={styles.listContainer}>
        <FlatList
          data={note?.filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => {
            return (
              <NoteItem
                note={item}
                onDeleteItem={deleteNoteHandler}
                onEditItem={editNoteHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
      )}
      <View style={styles.addButtonContainer}>
        <SecondaryButton title={language === "English" ? "New Note": "Yeni Not"} onPress={startAddNoteHandler} />
      </View>
    </SafeAreaView>
  );
};

export default NotesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    height: "75%",
  },
  addButtonContainer: {
    position: "absolute",
    top: "91%",
    alignSelf: "center",
  },
});
