'use client'

import React, {useState, useRef} from 'react'
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
  FormLabel,
  Input,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  Center,
  Text,
} from '@chakra-ui/react'
import { useAuth } from '@/providers'

interface IUserInfo {
  name: string;
  job: string;
}
enum Steps {
  pre = 0,
  next = 1
}

const WelcomeModal = () => {
  const { onClose } = useDisclosure();
  const { value, save } = useAuth();

  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<Steps>(Steps.pre);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: value?.name || '',
    job: value?.job || '',
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleStep = (curStep: Steps) => () => {
    setStep(curStep);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await save(userInfo);
      if (value) {
        setIsOpen(false);
      }
    } catch (error) {
      setErrorMsg('Invalid user info, please fill all fields');
      console.error(error);
    }
    setIsSaving(false);
  };

  return (
    <Box maxH='100vh'>
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />

        <Center>
        <ModalContent p={15}>
          <Center>
            <Text fontSize="2xl" fontWeight="bold">
              Welcome Country Showcase
            </Text>
          </Center>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{step === Steps.pre ? 'Name' : 'Job'}</FormLabel>
              <Input
                placeholder={step === Steps.pre ? 'Name' : 'Job'}
                name={step === Steps.pre ? 'name' : 'job'}
                onChange={handleInputOnChange}
                required
                key={step}
                autoFocus
              />
            </FormControl>

            {errorMsg && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errorMsg}</AlertTitle>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            {step === Steps.pre ? (
              <Button bg="gray.700" color="white" mr={3} onClick={handleStep(Steps.next)} tabIndex={0}>
                Next
              </Button>
            ) : (
              <Stack spacing={4} direction="row" align="center">
                <Button bg="gray.700" color="white" mr={3} onClick={handleStep(Steps.pre)} tabIndex={0}>
                  Pre
                </Button>
                <Button bg="gray.700" color="white" onClick={handleSave} isLoading={isSaving} tabIndex={0}>
                  Save
                </Button>
              </Stack>
            )}
          </ModalFooter>

          <Slider
            aria-label="slider-ex-1"
            min={0}
            max={1}
            defaultValue={0}
            value={step}
            m={[1, 3]}
            color="gray.700"
            maxW="calc(100% - 24px)"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </ModalContent>
        </Center>
      </Modal>
    </Box>
  );
};

export default WelcomeModal;
