import express, {Request, Response} from 'express';
import {google} from 'googleapis'
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT || 8081;

const app = express();

const environment = {
    production: false,
    gsuite: {
        primaryEmail: 'laura.m@desfas.com',
        scopes: [
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/admin.directory.user',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.google.com/calendar/feeds',
            'https://www.googleapis.com/auth/pubsub',
        ],
        key: {
            type: "service_asccount",
            project_id: "wise-philosophy-347014",
            private_key_id: "86be910a38a6437480e9a35b8e0f4fcddad5d054",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOsFLQVnlG/vyb\n55CIS2ca2S1ilqePwqF2dqnruKisVs8rgD/n116T6PFio8DtOr8yTxvnWscigb0b\nCJ+BxYxevHpak44Eajty2j4p9KWgcgZ8aqcZF+7kOcW9uXYnioTtMZEmnYE5rDDE\nX1RRqSdLOBdXyIiMns6uPZWqq6V88yo5fVLPlrqVpflIh/Lw+Dli7oZgtZ+H71eg\nw2/LUmzVOaioEW0Lh5Ishe8fAe+0PjxdnmcEnzgYuRnMiARlxuz19yT6elNIxvSg\nK8ZwjePYxXPJhZ5zt+/nNTO7003NPJSqNjsRoUqGabGN8KgsLJD3+5CxWFyJXZsv\n3Doew+0FAgMBAAECggEAW5ccI5FmTbU52JZ9YEBVsLqTl5AeMaD0buv3sWrTaAdR\n57t91i2EjjPYH7dkC1wQlOkketmpy9tFIwEnudiCMwr/hzrC4Kb4sBURHgN5D8fn\nouOaJ48JAB6vxzqzpqMF85wW7881EAsDU0nRMhysunLhOTe2duX6vZCxzX8hpuPI\nk+3ZZpFiK6d0dn2smZL4RyQvlTYhzWFh2p/I+T7riAlXXfeipwx8cufYGIcKADuj\np0p2tq7KJoaPPWCCdAAa1MEH3yb1vXLGr8n2xGVBsKtf2p6cHaoPIPeWM8CHVXl9\nJkMKMD0qQ9+jCS7mMzFVZ9G9aAV12iv1h/U2G26bcwKBgQDtzhDDK+u1nkEvjbdf\nN2AE7nGAz84rqGVRlIzgmmp6TWiZNauBX6QX++8y4z5B0380pmS95mky9YtQFv5t\nhXrZz91S14/w+Fz8DBWLcAecKZbnFhsFEf9sswngTVpsB5i+9T14A3e4guidamvE\nxSC7FZ1SdO9r1OLN8u7ftuHqSwKBgQDegMdrIyOLXjA6SwJEKKq/nbLckqpLUwAc\nf9egKfuaMjKsfL4S21V9e6909OvyHLn4qi61PeD3Q6fgmifs5aAUHGRzokV3Nxji\noy5fyuYARBw22hVmfrCKi+KXkpttUmLC9s3/HRnD3KzVI8VZSwuQ1dGZJrsNhj4P\nc8+62D/z7wKBgEyury8QYaCeGG0KKMBWbesJLKaZ2+SuF4XX/hmLEZzAi2MkMFq2\niYaGYdqp9nBpj9JdeYzW2MNq9HJuB7svWK8V3UuSYUMWA33vM59UD9AmhRedRDc9\nV30oup2OtAKz7GhfUmP50kg4RmREZd38pxJM5P8q3+2Ip1474RVYtr7DAoGBAJ3b\nf5/jLjSSfmTdEp6Iu5t2po8W/vqxyEJv8OsQ3hBnzMvTNIbsVZrRRYoUudDr0IU7\nOCgd3p2Owmv28px/zTJ3ck0Xs3EBBgbE/wG3Ubaem+XOk6BEAbxJwlkHCn5lFOx9\nbWixnLX4uiX9WuYe9/WpvSqK7+qIcz9DSv2krrrBAoGAO9MWu6G8lLp9Yj0duvSS\nga3SWkOKEQbLm6A4nUhpuLzS8ELzcwTOaqPaehRVuONSM9Q50asvREIuBhFj7Hxu\nEGIj7Q4vIVT9erHB+1jl94o4MXCF0oDmVu3dyI46W785XIIzKo7CzfoArbQMoT9p\n2Cq7nl/1/NiI6DVbSfwNKrI=\n-----END PRIVATE KEY-----\n",
            client_email: "prueba@wise-philosophy-347014.iam.gserviceaccount.com",
            client_id: "112759179500255102274",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/prueba%40wise-philosophy-347014.iam.gserviceaccount.com"
        }
    },
};

const gsuiteConnectionUtility = ({
                                     primaryEmail,
                                     scopes,
                                     credentials
                                 }: { primaryEmail: string, scopes: string[], credentials: any }) => {

    try {

        return new google.auth.JWT(
            credentials.client_email,
            undefined,
            credentials.private_key,
            scopes,
            primaryEmail,
        )

    } catch (error) {

        console.log(error)

    }

}

app.get('/test', (req: Request, res: Response) => {

    console.log(req.body)
    console.log(req.query)
    console.log(req.params)

    res.json({message: 'Hello World!'})

})

app.post('/test', async (req: Request, res: Response) => {

    const authorization = gsuiteConnectionUtility({
        primaryEmail: environment.gsuite.primaryEmail,
        scopes: environment.gsuite.scopes,
        credentials: environment.gsuite.key
    })

    const gmail = google.gmail({version: 'v1', auth: authorization});

    const {data} = await gmail.users.watch({
        userId: 'me',
        requestBody: {
            labelIds: ['INBOX'],
            topicName: 'projects/wise-philosophy-347014/topics/TestAssemblyFlowTopic'
        }
    })

    console.log(data)

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

