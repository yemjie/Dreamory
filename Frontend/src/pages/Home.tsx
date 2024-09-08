import { Button, Center, Image, Input, Select, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppState } from "../state/State";
import { useNavigate } from "react-router-dom";
import { eventStatus } from "../constants/constants"

interface Event {
    name: string;
    status: string;
    location: string;
    image?: string;
    _id: string;
}

async function fetchEvent(isLogin: boolean, currentUser: string) {

    const endpoint: string = isLogin ? 'http://localhost:3000/api/events?user=' + currentUser : 'http://localhost:3000/api/events'
    const response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const json = await response.json();
    return json
}

function filterEvent(eventName: string, eventStatus: string, events: Event[]) {

    let filteredEvents = events;

    if (eventName && eventName !== '') {
        filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(eventName.toLowerCase())
        );
    }

    console.log(eventStatus)

    if (eventStatus && eventStatus !== '') {
        filteredEvents = filteredEvents.filter(event =>
            event.status && event.status.toLowerCase().includes(eventStatus.toLowerCase())
        );
    }

    return filteredEvents;
}

export default function HomePage() {

    const { isLogin, username } = useAppState();
    const [events, setEvent] = useState<Event[]>([]);
    const [eventName, setEventName] = useState('');
    const [eventstatus, setEventStatus] = useState('');

    const toast = useToast();
    const navigate = useNavigate();

    function handleEditClick(eventid: string) {
        navigate("/edit/" + eventid)
    }

    async function handleDeleteClick(eventid: string) {

        try {

            console.log("Delete: " + eventid)

            const endpoint: string = 'http://localhost:3000/api/events/' + eventid
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            console.log(response)

            if (response.ok) {
                
                var index = events.findIndex((event) => event._id == eventid)
                const updatedEvents = events.filter((_, i) => i !== index);
                setEvent(updatedEvents);

                toast({
                    title: "Event Delete Successfully",
                    status: "success",
                });

            }
            else{

                const data = await response.json();

                toast({
                    title: "Oops",
                    description: data.data,
                    status: "error",
                    isClosable: true,
                });

            }







        } catch (error) {
            console.log(error)
        }

    }

    console.log("isLogin: " + isLogin)
    console.log("username: " + username)
    console.log(events)

    useEffect(() => {
        fetchEvent(isLogin, username).then((responds) => {
            setEvent(responds.data)
        })
    }, [])

    const filteredEvents = filterEvent(eventName, eventstatus, events)

    return (
        <>
            <Stack padding="20px 100px" alignItems="left" justifyContent="center" >
                <Text mb='8px'>Filter</Text>
                <Input placeholder='Event Name'
                    value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <Select id="selstatus" placeholder="Select Status" onChange={(e) => setEventStatus(e.target.value)} >
                    {eventStatus.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </Select>
            </Stack>

            {events.length > 0 ? (

                <TableContainer>
                    <Table variant='simple'>

                        <Thead>
                            <Tr>
                                <Th colSpan={5}></Th>
                                <Th colSpan={8}>Event</Th>
                                <Th colSpan={1}>Status</Th>
                                {isLogin && (<Th colSpan={2}></Th>)}
                            </Tr>
                        </Thead>

                        <Tbody>

                            {filteredEvents.length > 0 ? (filteredEvents.map((event, index) => {

                                return (
                                    <Tr key={index}>
                                        <Td colSpan={5}>
                                            <Image src={event.image} alt="no-image-or-image-not-accessible" />
                                        </Td>
                                        <Td colSpan={8}>{event.name}</Td>
                                        <Td colSpan={1}>{event.status}</Td>
                                        {isLogin && (<Td colSpan={1}><Button bg={'blue'} color={"white"} onClick={() => handleEditClick(event._id)}>Edit</Button></Td>)}
                                        {isLogin && (<Td colSpan={1}><Button bg={'red'} color={"white"} onClick={() => handleDeleteClick(event._id)}>Delete</Button></Td>)}
                                    </Tr>
                                )
                            })) : (<Center>No Event To Show</Center>)
                            }

                        </Tbody>

                    </Table>
                </TableContainer>
            ) : (<Center>No Event to show</Center>)}
        </>
    )
}