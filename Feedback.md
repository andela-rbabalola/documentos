- Remove password from all users payload
- Change the response code from 401 to 403 where necessary
401 --> Is for users that are not authorized at all
403 --> forbidden users are not allowed to acces that resource
- Return user details when he is updated
- Remove duplicate endpoints for gettting documents for a user
- A user should be able to see the public documents for another user by id
- Use query params in the search
- Back end routes should be prefixed with api
- Make the error messages more informative
