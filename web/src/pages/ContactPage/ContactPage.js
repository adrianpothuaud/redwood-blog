import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { error, loading }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: data,
      },
    })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />

      <Form
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
        onSubmit={onSubmit}
      >
        <FormError
          error={error}
          wrapperClassName="py-4 px-6 rounded-lg bg-red-100 text-red-700"
          listClassName="list-disc ml-4"
          listItemClassName=""
        />
        <Label
          className="block text-gray-700 uppercase text-sm"
          errorClassName="block uppercase text-sm text-red-700"
          name="name"
        >
          Name
        </Label>
        <TextField
          className="border rounded-sm px-2 py-1 outline-none"
          errorClassName="border rounded-sm px-2 py-1 border-red-700 outline-none"
          id="name"
          name="name"
          validation={{ required: true }}
        />
        <FieldError className="block text-red-700" name="name" />

        <Label
          className="block mt-8 text-gray-700 uppercase text-sm"
          errorClassName="block mt-8 text-red-700 uppercase text-sm"
          name="email"
        >
          Email
        </Label>
        <TextField
          className="border rounded-sm px-2 py-1"
          errorClassName="border rounded-sm px-2 py-1 border-red-700 outline-none"
          id="email"
          name="email"
          validation={{
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
            required: true,
          }}
        />
        <FieldError className="block text-red-700" name="email" />

        <Label
          className="block mt-8 text-gray-700 uppercase text-sm"
          errorClassName="block mt-8 text-red-700 uppercase text-sm"
          name="message"
        >
          Message
        </Label>
        <TextAreaField
          className="block border rounded-sm px-2 py-1"
          errorClassName="block border rounded-sm px-2 py-1 border-red-700 outline-none"
          id="message"
          name="message"
          validation={{ required: true }}
        />
        <FieldError className="block text-red-700" name="message" />

        <Submit
          className="block bg-blue-700 text-white mt-8 px-4 py-2 rounded"
          disabled={loading}
        >
          Send message
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
