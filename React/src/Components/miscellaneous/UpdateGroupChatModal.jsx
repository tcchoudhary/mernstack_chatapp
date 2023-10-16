import { ViewIcon } from "@chakra-ui/icons";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { DrawerBody, Drawer, DrawerContent, DrawerOverlay, DrawerHeader, DrawerCloseButton } from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:7000/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:7000/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:7000/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:7000/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const [size, setSize] = React.useState('sm')
  const handleClick = () => {
    setSize(size)
    onOpen()
  }



  //editing

  const [value, setValue] = useState('John');
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  // about details
  const [value1, setValue1] = useState('how are you ?');
  const [editMode1, setEditMode1] = useState(false);


  const handleEditClick1 = () => {
    setEditMode1(true);
  };

  const handleSaveClick1 = () => {
    setEditMode1(false);
  };

  const handleInputChange1 = (event) => {
    setValue1(event.target.value);
  };

  return (
    <>
      <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={() => handleClick(size)} />
      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {/* <h1>{selectedChat.chatName}</h1> */}
          </DrawerHeader>
          <DrawerBody>
            {/* <Modal onClose={onClose} isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody display="flex" flexDir="column" alignItems="center">
                  <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                    {selectedChat.users.map((u) => (
                      <UserBadgeItem
                        key={u._id}
                        user={u}
                        admin={selectedChat.groupAdmin}
                        handleFunction={() => handleRemove(u)}
                      />
                    ))}
                  </Box>
                  <FormControl display="flex">
                    <Input
                      placeholder="Chat Name"
                      mb={3}
                      value={groupChatName}
                      onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      ml={1}
                      isLoading={renameloading}
                      onClick={handleRename}
                    >
                      Update
                    </Button>
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Add User to group"
                      mb={1}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </FormControl>

                  {loading ? (
                    <Spinner size="lg" />
                  ) : (
                    searchResult?.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                      />
                    ))
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => handleRemove(user)} colorScheme="red">
                    Leave Group
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal> */}

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateGroupChatModal;
