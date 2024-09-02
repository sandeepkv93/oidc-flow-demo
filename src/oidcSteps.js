export const oidcSteps = [
  {
    title: '1. Developer Registers Application',
    description:
      "The app developer registers 'CalendarBuddy' with Google's API Console, providing app details and requested permissions.",
    details:
      'Google issues a client_id (public identifier) and client_secret (confidential) for the app.',
    diagram: `sequenceDiagram
      participant Dev as Developer
      participant Google as Google API Console
      Dev->>Google: Register app & request permissions
      Google->>Dev: Issues client_id and client_secret`,
  },
  {
    title: '2. User Attempts to Access Protected Resource',
    description:
      'You try to use CalendarBuddy to access your Google Calendar data.',
    diagram: `sequenceDiagram
      actor User
      participant CB as CalendarBuddy App
      User->>CB: Attempts to access Google Calendar`,
  },
  {
    title: '3. App Redirects to Authorization Server',
    description:
      "CalendarBuddy redirects you to Google's authorization page, including its client_id and requested permissions.",
    details: `The authorization request URL looks like this:

https://accounts.google.com/o/oauth2/v2/auth?
  client_id=123456789-abcdefghijklmnop.apps.googleusercontent.com&
  redirect_uri=https://calendarbuddy.com/auth/google/callback&
  response_type=code&
  scope=https://www.googleapis.com/auth/calendar.readonly&
  state=xyzABC123

This URL includes the client_id, redirect_uri, response_type (code), scope (calendar access), and a state parameter for security.`,
    diagram: `sequenceDiagram
      actor User
      participant CB as CalendarBuddy App
      participant Google as Google Auth Server
      CB->>User: Redirects to Google login
      User->>Google: Arrives at Google login page`,
  },
  {
    title: '4. User Authenticates and Grants Permissions',
    description:
      'You log into your Google account and agree to grant CalendarBuddy the requested permissions.',
    diagram: `sequenceDiagram
      actor User
      participant Google as Google Auth Server
      User->>Google: Logs in and grants permissions`,
  },
  {
    title: '5. Authorization Server Issues Code',
    description:
      'Google generates an authorization code and redirects you back to CalendarBuddy with this code.',
    details: `The redirect back to CalendarBuddy looks like this:

https://calendarbuddy.com/auth/google/callback?
  code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
  state=xyzABC123

This includes the authorization code and the same state parameter for security verification.`,
    diagram: `sequenceDiagram
      participant Google as Google Auth Server
      actor User
      participant CB as CalendarBuddy App
      Google->>User: Redirects with authorization code
      User->>CB: Returns to app with code`,
  },
  {
    title: '6. App Exchanges Code for Tokens',
    description:
      'CalendarBuddy sends the authorization code, along with its client_id and client_secret, to Google to exchange for tokens.',
    details: `CalendarBuddy makes a POST request to Google's token endpoint:

POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
client_id=123456789-abcdefghijklmnop.apps.googleusercontent.com&
client_secret=CLIENTSECRETxxxxxxxxxxx&
redirect_uri=https://calendarbuddy.com/auth/google/callback&
grant_type=authorization_code

This request includes the authorization code, client_id, client_secret, redirect_uri, and grant_type.`,
    diagram: `sequenceDiagram
      participant CB as CalendarBuddy App
      participant Google as Google Auth Server
      CB->>Google: Exchanges code for tokens`,
  },
  {
    title: '7. Authorization Server Returns Tokens',
    description:
      'Google validates the request and returns an ID token, access token, and refresh token to CalendarBuddy.',
    details: `Response includes:

1. ID Token (JWT format):
eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiZDY3NzRlNjljNjc...[truncated for brevity]

When decoded, the payload looks like:
{
  "iss": "https://accounts.google.com",
  "azp": "123456789-abcdefghijklmnop.apps.googleusercontent.com",
  "aud": "123456789-abcdefghijklmnop.apps.googleusercontent.com",
  "sub": "10769150350006150715113082367",
  "email": "user@example.com",
  "email_verified": true,
  "at_hash": "HK6E_P6Dh8Y93mRNtsDB1Q",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocLrPJw...[truncated]",
  "given_name": "John",
  "family_name": "Doe",
  "locale": "en",
  "iat": 1516239022,
  "exp": 1516242922
}

2. Access Token (usually opaque, but can be JWT):
ya29.a0AfB_byC7nPsuAjvJO1gjxq-KBF2-MoZaKMf0dj...[truncated for brevity]

3. Refresh Token (opaque string):
1//0eXABCDEF-ghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

4. Additional Information:
{
  "expires_in": 3599,
  "token_type": "Bearer"
}

The ID Token is a JWT that contains claims about the user's identity.
The Access Token is used to access protected resources.
The Refresh Token is used to obtain new Access Tokens when they expire.`,
    diagram: `sequenceDiagram
      participant Google as Google Auth Server
      participant CB as CalendarBuddy App
      Google->>CB: Returns ID token, access token, refresh token`,
  },
  {
    title: '8. App Processes ID Token',
    description:
      'CalendarBuddy decodes the ID token to obtain user information.',
    details:
      "The ID token is a JWT (JSON Web Token) containing claims about the user's identity. The app may perform basic checks like expiration.",
    diagram: `sequenceDiagram
      participant CB as CalendarBuddy App
      CB->>CB: Decodes ID token and extracts user info`,
  },
  {
    title: '9. App Requests Protected Resource',
    description:
      "CalendarBuddy uses the access token to request your calendar data from Google's Calendar API.",
    details:
      'The access token is included in the Authorization header of the API request.',
    diagram: `sequenceDiagram
      participant CB as CalendarBuddy App
      participant GC as Google Calendar API
      CB->>GC: Requests calendar data with access token`,
  },
  {
    title: '10. Resource Server Returns Protected Resource',
    description:
      "Google's Calendar API validates the access token and returns your calendar data to CalendarBuddy.",
    diagram: `sequenceDiagram
      participant GC as Google Calendar API
      participant CB as CalendarBuddy App
      GC->>CB: Returns calendar data`,
  },
  {
    title: '11. App Displays Protected Resource',
    description:
      'CalendarBuddy presents your Google Calendar data to you in its interface.',
    diagram: `sequenceDiagram
      participant CB as CalendarBuddy App
      actor User
      CB->>User: Displays calendar data`,
  },
]
