import * as React from "react"
import { Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Footer } from "./footer"

declare let module

storiesOf("Footer", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Disable button", () => (
    <Story>
      <UseCase text="First Button" usage="First button Active and disable">
        <Footer fromSend={true} />
      </UseCase>
      <UseCase text="Second Button" usage="Second button Active and disable">
      <Footer fromSend={false} />
      </UseCase>
      <UseCase text="First Button message" usage="On click on first button display a message">
        <Footer fromSend={false} onSendPress={()=>{Alert.alert("first button pressed")}}/>
      </UseCase>
      <UseCase text="Second Button message" usage="On click on second button display a message">
        <Footer fromSend={false} onListPress={()=>{Alert.alert("second button pressed")}}/>
      </UseCase>
    </Story>
  ))
