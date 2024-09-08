import { Button, Center, Container, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Spacer, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppState } from "../state/State";

interface FormValues {
    image: string;
    name: string;
    status?: string | null;
    createdby?: string;
}

interface FormErrors {
    image?: string;
    name?: string;
    status?: string;
}

export default function EventForm({ isEdit }: { isEdit: boolean }) {
    const toast = useToast();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { isLogin, username } = useAppState();

    function validate(values: FormValues) {
        const errors: FormErrors = {};

        if (!values.name) {
            errors.name = "Required";
        }

        if (isEdit) {
            if (values.status == null || values.status == undefined || values.status == "") {
                errors.status = "Status is required";
            } else if (!['Ongoing', 'Complete'].includes(values.status)) {
                errors.status = "Invalid Status";
            }
        }

        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
        if (values.image && !urlPattern.test(values.image)) {
            errors.image = "Invalid URL. Use a valid HTTPS URL.";
        }

        return errors;
    }

    async function event_CreateOrUpdate(values: FormValues, isEdit: boolean, username: string) {

        values.createdby = username

        const endpoint = isEdit ? 'http://localhost:3000/api/events/' + id : 'http://localhost:3000/api/events/'

        const response = await fetch(endpoint, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values }),
        });

        const data = await response.json();

        if (response.status === 200) {
            toast({
                title: "Update Successfully",
                status: "success",
            });

            navigate('/');
        } else {
            toast({
                title: "Oops",
                description: data.data,
                status: "error",
                isClosable: true,
            });
        }
    }

    async function event_fetchData() {
        const endpoint = 'http://localhost:3000/api/events/' + id;

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        return json;
    }

    const [eventName, setEventName] = useState('');
    const [eventStatus, setEventStatus] = useState('');
    const [eventImage, setImage] = useState('');

    useEffect(() => {
        if (!isLogin) {
            navigate('/');
        }

        if (isEdit && id) {
            event_fetchData().then((response) => {
                setEventName(response.data.name);
                setEventStatus(response.data.status);
                setImage(response.data.image ? response.data.image : '');
            });
        }
    }, [isLogin, isEdit, id]);


    return (
        <Formik
            initialValues={{ name: eventName, status: eventStatus, image: eventImage }}
            enableReinitialize={true} // Allows Formik to reset when initialValues change
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                event_CreateOrUpdate(values, isEdit, username);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, getFieldProps, errors, touched }) => (
                <Container marginTop={"10%"}>
                    <Form>
                        <Center as='b'>Edit Event</Center>

                        <FormControl isInvalid={!!(errors.name && touched.name)} isRequired>
                            <FormLabel htmlFor="name">Event Name</FormLabel>
                            <Input
                                id="name"
                                placeholder="Enter Event Name"
                                {...getFieldProps("name")}
                            />
                            {errors.name && touched.name && (
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            )}
                        </FormControl>

                        {isEdit &&
                            (<FormControl isInvalid={!!(errors.status && touched.status)} isRequired>
                                <FormLabel htmlFor="status">Event Status</FormLabel>
                                <Select
                                    id="status"
                                    placeholder="Select Status"
                                    {...getFieldProps("status")}
                                >
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Complete">Complete</option>
                                </Select>
                                {errors.status && touched.status && (
                                    <FormErrorMessage>{errors.status}</FormErrorMessage>
                                )}
                            </FormControl>)}

                        <FormControl isInvalid={!!(errors.image && touched.image)}>
                            <FormLabel htmlFor="image">Event Thumbnail</FormLabel>
                            <Input
                                id="image"
                                placeholder="Enter An Image URL"
                                {...getFieldProps("image")}
                            />
                            {errors.image && touched.image && (
                                <FormErrorMessage>{errors.image}</FormErrorMessage>
                            )}
                        </FormControl>

                        <Flex>
                            <Button
                                marginTop={"25px"}
                                colorScheme="teal"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>

                            <Spacer />

                            <Button
                                marginTop={"25px"} type="submit" disabled={isSubmitting} onClick={() => { navigate('/') }}
                            >
                                Back
                            </Button>
                        </Flex>
                    </Form>
                </Container>
            )}
        </Formik>
    );
}
