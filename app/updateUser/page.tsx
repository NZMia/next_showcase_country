'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { useAuth } from '@/providers'
import { useRouter } from 'next/navigation'

interface IUserInfo {
  name: string;
  job: string;
}
interface IMessage {
  type: string;
  message: string;
}

const UpdateUser = () => {
  const { value, save } = useAuth();
  const router = useRouter();
  
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: value?.name || '',
    job: value?.job || '',
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [msg, setMsg] = useState<IMessage>({
    type: '',
    message: '',
  });

  useEffect(() => {
    if(!value) router.replace('/')
  },[value, router])

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg({
      type: '',
      message: '',
    });
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  },[userInfo])

  const handleSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSaving(true);
    try {
      await save(userInfo);
      setMsg({
        type: 'success',
        message: 'Update user successfully !'
      });
    } catch (error) {
      setMsg({
        type: 'error',
        message: 'Update user failed ! please fill all fields'
      });
      console.error(error);
    }
    setIsSaving(false);
  }, [userInfo])
  
  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      p="4"
    >
      <Box maxW="md" w="100%">
        <form style={{
          background:'#2D3748',
          padding: '2.25rem',
          minWidth: '150px',
          borderRadius: '0.675rem',
          color: '#fff'
          }}>
          <FormControl mb="4">
            <FormLabel htmlFor='name' fontSize='lg'>Name</FormLabel>
            <Input 
              type="text"
              defaultValue={userInfo?.name}
              placeholder="Enter your name" 
              bg='gray.100' 
              color='gray.700'
              name='name'
              onChange={handleOnChange}
              key='name'
              id='name'
              aria-label="Name" />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor='Job' fontSize='lg'>Job</FormLabel>
            <Input 
              type="text" 
              defaultValue={userInfo?.job}
              bg='gray.100' 
              color='gray.700' 
              name='job'
              onChange={handleOnChange}
              key='job'
              id='job'
              aria-label='Job' />
          </FormControl>
          {msg.message && (
              <Alert status={msg.type === 'error' ? 'error' : 'info'} role='alert'>
                <AlertIcon />
                <AlertTitle>{msg.message}</AlertTitle>
              </Alert>
            )}
          <Button 
             mt='4' 
             onClick={handleSubmit}
             isLoading={isSaving} 
             aria-label='Submit'
            >
              Submit
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default UpdateUser
