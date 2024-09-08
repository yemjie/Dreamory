import { Button, Center, Container, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useAppState } from "../state/State";
import { useNavigate } from "react-router-dom";


interface FormValues {
    email: string;
    password: string;
    confirmpass: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmpass?: string;
}

export default function UserForm({ isCreateUser }: { isCreateUser: boolean }) {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { setIsLogin, setUserName } = useAppState();

    const toast = useToast();
    const navigate = useNavigate();


    function validate(values: FormValues) {

        const errors: FormErrors = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (isCreateUser) {
            if (!values.confirmpass) {
                errors.confirmpass = "Required";
            } else if (values.confirmpass != values.password) {
                errors.confirmpass = "Password does not match";
            }
        }

        console.log('comfirmppass ' + !values.confirmpass)
        console.log('Create User' + isCreateUser)
        console.log(errors)

        return errors;
    };

    async function triggerUserApi(endpoint: string, values: any) {

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            })
        })

        var redirect: boolean = false
        const data = await response.json()

        if (response.status == 200) {

            toast({
                title: isCreateUser ? "User Created" : "Login Successfully",
                description: 'You will be redirect to home screen.',
                status: "success",
            });

            redirect = true

            if (!isCreateUser) {
                setIsLogin(true)
                console.log(data.data)
                setUserName(data.data)
            }

        }
        else {
            console.log(data)
            toast({
                title: "Opps",
                description: data.data,
                status: "error",
                isClosable: true
            });
        }

        if (redirect) { isCreateUser ? navigate('/admin/login') : navigate('/'); }
    }

    return (
        <Formik
            initialValues={{ email: "", password: "", confirmpass: "" }}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);

                var endpoint: string
                if (isCreateUser) { endpoint = 'http://localhost:3000/api/user/create' }
                else { endpoint = 'http://localhost:3000/api/user' }

                triggerUserApi(endpoint, values)
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, getFieldProps, errors, touched }) => (
                <Container marginTop={"10%"}>
                    <Form>
                        <Center as='b'>{isCreateUser ? 'Create User' : 'Log In'}</Center>
                        <FormControl isInvalid={!!(errors.email && touched.email)} isRequired>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                placeholder="Enter Email"
                                {...getFieldProps("email")}
                            />
                            {errors.email && touched.email && (
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={!!(errors.password && touched.password)} isRequired mt={4}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    id="password" pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password"
                                    {...getFieldProps("password")}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && touched.password && (
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            )}
                        </FormControl>

                        {isCreateUser && (<>
                            <FormControl isInvalid={!!(errors.confirmpass && touched.confirmpass)} isRequired mt={4}>
                                <FormLabel htmlFor="confirmpass">Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        id="confirmpass" pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password to confirm password"
                                        {...getFieldProps("confirmpass")}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.confirmpass && touched.confirmpass && (
                                    <FormErrorMessage>{errors.confirmpass}</FormErrorMessage>
                                )}
                            </FormControl>
                        </>)}

                        <Button
                            marginTop={"25px"}
                            colorScheme="teal"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Form>

                    {!isCreateUser && (
                        <Container>
                            <Center> Don't have an account? <Text as="a" href="/admin/signup" paddingLeft={"5px"} color={"blue"}>Sign Up here.</Text></Center>
                        </Container>
                    )}

                </Container>
            )}
        </Formik>
    );
}
