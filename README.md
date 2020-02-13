# scheduling

similar to that one component on airbnb to check availability and book appointments

## API Routes:

`/GET`
/api/listings/:listing_id

- Retrieve one listing

## Information to send in request:

- Sending a listing id in the form of an integer so that API can identify what information to retrieve.

## Information expected in response:

- Expecting an empty JSON response (optional: supply information from retireved listing if available)

`/POST`
/api/listings/listing_id/:new_booking

- Add a booking to the schedule

## Information to send in request:

- Sending information about new listing. Information should be sent in the request parameters in the form of an object. Example:
  { accommodationId: Number,
  costPerNight: Number,
  reviewsCount: Number,
  ratingScore: Number,
  maxGuests: Number,
  reservedDates: String,
  cleaningFee: Number,
  serviceFee: Number,
  occupancyFee: Number}

## Information expected in response:

- Expecting a response in the form of an object that includes a status code of 200 if successful. Example:
  {statusCode: 200,
  posted: true}

`/PUT`
/api/listings/:listing_id

- Update a listing in the collection

## Information to send in request:

- Information in the form of an object with key value pairs specifying which dates to update.

## Information expected in response:

- Expecting a response in the form of an object that includes a status code of 200 if successful. Example:
  {statusCode: 200,
  updated: true}

`/DELETE`
/api/listings/:listing_id

- Delete a listing in the collection by id

## Information to send in request:

- ID with number of listing to be removed from the dataset.

## Information expected in response:

- Expecting an empty JSON response (optional: supply information from deleted listing if available, i.e. name)
