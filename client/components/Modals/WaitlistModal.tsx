// Modal
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1E1E1F',
  },
}

export const WaitlistModal = ({
  waitlistModalIsOpen,
  setwaitlistModalIsOpen,
}: {
  waitlistModalIsOpen: boolean
  setwaitlistModalIsOpen: (arg: boolean) => void
}) => {
  function closeModal() {
    setwaitlistModalIsOpen(false)
  }
  useEffect(() => {
    ReactModal.setAppElement('body')
    if (ReactModal.defaultStyles.overlay !== undefined)
      ReactModal.defaultStyles.overlay.backgroundColor = 'transparent'
  }, [])

  const [email, setEmail] = useState('test@gmail.com')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const subscribeMe = async () => {
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({ email: email }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    const { error, message } = await res.json()
    setError(error)
    setSuccess(message)
  }

  return (
    <ReactModal
      id='product_modal'
      isOpen={waitlistModalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Create Product Modal'
    >
      <div className='w-full h-full flex flex-col justify-center items-center gap-7 pb-7 pt-3 px-4'>
        <h3 className='text-3xl font-medium text-white'>
          Join LunarPay Waitlist
        </h3>
        <div className='flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-center items-center gap-2'>
            <p className='font-medium text-sm'>EMAIL</p>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter email..'
              className='rounded-sm outline-none pl-2 font-display h-7 flex justify-center items-center'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <button
          onClick={async () => {
            handler({ email })
            closeModal
          }}
          className='px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer'
        >
          Join
        </button>
      </div>
    </ReactModal>
  )
}

const handler = async ({ email }: { email: string }) => {
  return new Promise((res, rej) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_REVUE_API_KEY
      let xhr = new XMLHttpRequest()
      let url = 'https://www.getrevue.co/api/v2/subscribers'
      xhr.open('POST', url)
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.setRequestHeader('Authorization', `Token ${API_KEY}`)
      xhr.setRequestHeader('Content-Type', 'application/json')
      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState === 4) {
      //     console.log(xhr.status)
      //     console.log(xhr.responseText)
      //   }
      // }

      let data = { email: email, double_opt_in: false }
      xhr.send(JSON.stringify(data))
      // xhr.onloadend = function () {
      //   console.log('Request Sent')
      // }
      // 3. We check in the response if the status is 400
      // If so, consider it as error and return. Otherwise a 201
      // for create
    } catch (err: any) {
      // 4. If the control goes inside the catch block
      // let us consider it as a server error(500)
      rej(JSON.stringify({ error: err.message.toString() }))
    }
  })
}
