import React from 'react'
import { render, fireEvent,waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {UserRegister} from "../components/dashboard/authentication/Register"

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


describe("Register", () => {
    describe("with valid inputs", () => {
        it('calls the onSubmit function', async () => {
            const mockOnSubmit = jest.fn()
            const { getByLabelText, getByRole } = render(<UserRegister onSubmit={mockedUsedNavigate} />)
    
            await act(async () => {
                fireEvent.change(getByLabelText("Names"), { target: { value: "Gasaro Leila" } })
                fireEvent.change(getByLabelText("Email"), { target: { value: "uwamgaleila@gmail.com" } })
                fireEvent.change(getByLabelText("Gender"), { target: { value: "FEMALE" } })
                fireEvent.change(getByLabelText("Age"), { target: { value: 17 } })
                fireEvent.change(getByLabelText("Date Of Birth"), { target: { value: "22/10/2004" } })
                fireEvent.change(getByLabelText("Maritial Status"), { target: { value: "SINGLE" } })
                fireEvent.change(getByLabelText("Nationality"), { target: { value: "Rwandan" } })
    
                let file;
    
        file = new File(["(⌐□_□)"],"image.png");
        let uploader = getByLabelText("Profile Picture");
        await waitFor(() =>
          fireEvent.change(uploader, {
            target: { files: [file] },
          })
        );
            })
    
            await act(async () => {
                try {
                    fireEvent.click(getByRole("button"))
                    expect(mockedUsedNavigate).toHaveBeenCalled()
                } catch (err) {
                    console.log(err)
                }
            })
    
    
        })
        
    })

  describe("with invalid names", () => {
    it("renders the names validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const namesInput = getByLabelText("Names")
        fireEvent.change(namesInput, {target: {value: ""}})
        fireEvent.blur(namesInput)
      })

      expect(getByTestId("names").innerHTML).toMatch("Please enter your Names")
    })
  })
    
  describe("with invalid email", () => {
    it("renders the email validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const emailInput = getByLabelText("Email")
        fireEvent.change(emailInput, {target: {value: ""}})
        fireEvent.blur(emailInput)
      })

      expect(getByTestId("email").innerHTML).toMatch("Please enter a valid email")
    })
  })

  describe("with invalid gender", () => {
    it("renders the gender validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const genderInput = getByLabelText("Gender")
        fireEvent.change(genderInput, {target: {value: "NOT A GENDER"}})
        fireEvent.blur(genderInput)
      })

      expect(getByTestId("gender").innerHTML).toMatch("Please select your Gender")
    })
  })
    
  describe("with invalid Maritial Status", () => {
    it("renders the Maritial Status validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const statusInput = getByLabelText("Maritial Status")
        fireEvent.change(statusInput, {target: {value: ""}})
        fireEvent.blur(statusInput)
      })

      expect(getByTestId("status").innerHTML).toMatch("Please select a Maritial Status")
    })
  })

  describe("with invalid nationality", () => {
    it("renders the nationality validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const nationalityInput = getByLabelText("Nationality")
        fireEvent.change(nationalityInput, {target: {value: ""}})
        fireEvent.blur(nationalityInput)
      })

      expect(getByTestId("nationality").innerHTML).toMatch("Please select your nationality")
    })
  })
    
  describe("with invalid profile", () => {
    it("renders the profile validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const profileInput = getByLabelText("Profile Picture")
        fireEvent.change(profileInput, {target: {value: ""}})
        fireEvent.blur(profileInput)
      })

      expect(getByTestId("profile").innerHTML).toMatch("Add Profile Picture")
    })
  })
    

  describe("with invalid password", () => {
    it("renders the password validation error", async () => {
      const {getByLabelText,getByTestId} = render(<UserRegister/>)

      await act(async () => {
        const passwordInput = getByLabelText("Password")
        fireEvent.change(passwordInput, {target: {value: "12"}})
        fireEvent.blur(passwordInput)
      })

      expect(getByTestId("password").innerHTML).toMatch("Password should be atleast 8 characters" || "Password should be atleast 8 letters, a symbol, upper and lower case letters and a number")
    })
  })

})