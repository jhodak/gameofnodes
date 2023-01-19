import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import {
  Form,
  useLoaderData,
  useActionData,
  useTransition,
} from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
//import styles from "~/styles/dashboard.apps.create.css"

export const meta: MetaFunction = () => {
  return {
    title: "Node List - Game of Nodes",
  }
}

export const links = () => {
  //return [{ rel: "stylesheet", href: styles }]
}

type LoaderData = {}

export const loader: LoaderFunction = async ({ request }) => {
  // const userCanCreateApp =
  //   permissions.includes(Permissions.AppsUnlimited) ||
  //   getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(user.profile.id) ||
  //   underMaxApps()

  // if (!userCanCreateApp) {
  //   return redirect("/dashboard/apps")
  // }

  return json<LoaderData>({
    headers: {
      "Cache-Control": `private, max-age=${
        process.env.NODE_ENV === "production" ? "3600" : "60"
      }`,
    },
  })
}

type ActionData = {
  error: true
  message: string
}

// export const action: ActionFunction = async ({ request }) => {
//   const user = await requireUser(request)
//   const portal = initPortalClient(user.accessToken)
//   const formData = await request.formData()
//   const subscription = formData.get("app-subscription")
//   const name = formData.get("app-name")

//   invariant(
//     subscription && typeof subscription === "string",
//     "app subscription not found",
//   )
//   invariant(name && typeof name === "string", "app name not found")

//   try {
//     const { createNewEndpoint } = await portal.createEndpoint({
//       name,
//     })

//     if (!createNewEndpoint) {
//       throw new Error("portal api could not create new endpoint")
//     }

//     if (subscription === PayPlanType.PayAsYouGoV0) {
//       formData.append("app-id", createNewEndpoint.id)

//       // setting to any because of a TS nnown error: https://github.com/microsoft/TypeScript/issues/19806
//       const params = new URLSearchParams(formData as any).toString()
//       return redirect(`/api/stripe/checkout-session?${params}`)
//     }

//     return redirect(`/dashboard/apps/${createNewEndpoint.id}`)
//   } catch (error) {
//     return json({
//       error: true,
//       message: getErrorMessage(error),
//     })
//   }
// }

export default function CreateApp() {
  // const { flags } = useFeatureFlags()
  // const { price } = useLoaderData() as LoaderData
  // const transition = useTransition()
  // const action = useActionData() as ActionData
  // const [radioSelectedValue, setRadioSelectedValue] = useState(
  //   flags.STRIPE_PAYMENT === "true"
  //     ? PayPlanType.PayAsYouGoV0
  //     : PayPlanType.FreetierV0
  // )
  // const [name, setName] = useState("")
  // const [referral, setReferral] = useState("")

  // useEffect(() => {
  //   const rid = window.localStorage.getItem("rid")

  //   if (rid) {
  //     setReferral(rid)
  //   }
  // }, [])

  // const priceValue = useMemo(() => {
  //   // divide by 100 because stripe sends the value as a decimal
  //   return Number(price?.unit_amount_decimal) / 100 || 0.00000958685
  // }, [price])

  // const tiers = [
  //   {
  //     name: getPlanName(PayPlanType.FreetierV0),
  //     value: PayPlanType.FreetierV0,
  //     active: "true",
  //     price: 0,
  //     priceText: "$0.00",
  //     cardDescription:
  //       "Access to reliable, fast infrastructure. Free up to 250k relays per day.",
  //   },
  //   {
  //     name: getPlanName(PayPlanType.PayAsYouGoV0),
  //     value: PayPlanType.PayAsYouGoV0,
  //     active: flags.STRIPE_PAYMENT,
  //     price: priceValue,
  //     priceText: "pay per relay",
  //     cardDescription:
  //       "250k free relays per day, per app. Beyond that, pay only for what you use.",
  //   },
  // ]

  return (
    <section className="NodeList">
      <p>"Nodes Page"</p>
      {/* <Card>
        <div className="pokt-card-header">
          <h3>Create New App</h3>
        </div>
        <Form method="post">
          <input hidden name="referral-id" type="text" value={referral} />
          <TextInput
            label="Name"
            name="app-name"
            placeholder="New App Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AppRadioCards
            currentRadio={radioSelectedValue}
            radioData={tiers}
            setRadio={setRadioSelectedValue}
          />
          <Button
            disabled={transition.state === "submitting" || name === ""}
            type="submit"
            variant="filled"
            onClick={() => {
              trackEvent(AmplitudeEvents.EndpointCreation)
            }}
          >
            Create App
          </Button>
          <Text className="termsOfUseText" mb={16} mt={32} size="xs">
            By using this application, you agree to our{" "}
            <a
              href="https://www.pokt.network/site-terms-of-use"
              rel="noreferrer"
              target="_blank"
            >
              Terms of Use
            </a>
            .
          </Text>
        </Form>
        <AppPlansOverview planType={radioSelectedValue} />
        <CalculateYourPricing price={priceValue} />
      </Card> */}
      {/* {action && (
        <Card>
          <p>{action.message}</p>
        </Card>
      )} */}
    </section>
  )
}
