

import { Box, Text, Link, Stack, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" p={4} bg="gray.700" color="white">
       <Stack direction={['column', 'row']} spacing={4} align="center" justify="space-between">
        <Text>&copy; 2023 Created By Mia. All rights reserved.</Text>
        <HStack>
          <Link href="https://countries.trevorblades.com/" isExternal>
            Open Source (API)
          </Link>
          <Link href="https://chakra-ui.com/docs/components" isExternal>
            Chakra UI (Docs)
          </Link>
          <Link href="https://www.apollographql.com/docs/react/" isExternal>
            Apollo Client (Docs)
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
