'use client';

import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Button from '../components/general/Button';
import Card from '@/components/general/Card';
import { FaBoltLightning } from 'react-icons/fa6';
import Navbar from '@/components/nav/Navbar';
import { useRouter } from 'next/navigation';
import { FaDatabase, FaTools } from 'react-icons/fa';
import { useEnsureToken } from '@/helpers/auth';
import Loading from '@/components/general/Loading';

export default function Page() {
    const router = useRouter();
    const { isLogged, isPending } = useEnsureToken();
    // const isLogged = true;
    // const isPending = false;

    if (isPending) {
        return <Loading loadingButtons />;
    }

    return (
        <div>
            <Navbar withProfile withDashboard />
            <Flex alignItems="center" flexDirection="column">
                <Flex pt="160px" justifyContent="center" alignItems="center">
                    <Heading fontSize={30} fontWeight="semibold">
                        Build fast. Query faster. Debug forever.
                    </Heading>
                </Flex>

                <Flex pt="15vh">
                    <Card transform="translate(-7vw, 7vh)">
                        <Flex direction="column" alignItems="center" gap={12}>
                            <Heading fontWeight="bold" fontSize="xl">
                                Database Management
                            </Heading>
                            <Text
                                fontSize="lg"
                                textAlign="center"
                                opacity={0.9}
                            >
                                Manage your databases, backups, and
                                configurations in one place.
                            </Text>
                            <Icon
                                as={FaDatabase}
                                boxSize={16}
                                color="green.400"
                            />
                        </Flex>
                    </Card>
                    <Card>
                        <Flex direction="column" alignItems="center" gap={12}>
                            <Heading fontWeight="bold" fontSize="xl">
                                Instant Create
                            </Heading>
                            <Text
                                fontSize="lg"
                                textAlign="center"
                                opacity={0.9}
                            >
                                Create your database and run your first query in
                                30 seconds.
                            </Text>
                            <Icon
                                as={FaBoltLightning}
                                boxSize={16}
                                color="orange.400"
                            />
                            <Button
                                w="100%"
                                onClick={() =>
                                    router.push(
                                        isLogged ? '/dashboard' : '/login',
                                    )
                                }
                            >
                                Begin
                            </Button>
                        </Flex>
                    </Card>
                    <Card transform="translate(7vw, -7vh)">
                        <Flex direction="column" alignItems="center" gap={12}>
                            <Heading fontWeight="bold" fontSize="xl">
                                Advanced Settings
                            </Heading>
                            <Text
                                fontSize="lg"
                                textAlign="center"
                                opacity={0.9}
                            >
                                Access advanced configuration options to
                                fine-tune your system.
                            </Text>
                            <Icon
                                as={FaTools}
                                boxSize={16}
                                color="purple.400"
                            />
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
}
