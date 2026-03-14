Act on Activities


Midterm project will be an activity planner with multiple features for
generating an idea, list of required items for activity, possible food
options, a schedule with dates, and an area for the user to take notes.



Coding languages to be used:

- HTML
- CSS
- Vanilla JavaScript

Assistant used:

- Claude (CLI)

If user information will be stored

    - localstorage (BASE)

    - One of recommended Cloud Databases (Will evaluate which best fits needs)


For Complete Tier (Do this after Base is working)

- User Authentication (Log in) (Certain pages cannot be viewed without it) (remain logged in on refresh)
- Cloud Database (Recommends: Firebase Auth, Supabase Auth, or Auth0)
- 6-8 features in total, but has list requirements

        All Base Tier features, plus 2-3 from this list:

        - User profile with editable info or avatar [DONE]
        - Real-time updates
        - Categories, tags, or advanced filtering
        - Comments, reviews, or ratings [DONE]
        - Data visualization (charts with Chart.js or Recharts)
        - Media uploads (images, files)
        - Drag-and-drop, keyboard shortcuts, or bulk operations

        Items with (+) fit and are more likely to be chosen.

The features above were copied directly to avoid any miscommunication.



***********************

Minimum Viable Products (4-5):

- Activity Quiz: This will be a quiz that gathers information about the time of day that the activity is taking place, different preferences that the user has, and how many people may be attending.  The results of the quiz will give an idea for an activity that the user can participate in.

        The questions can be as follows:

        1. When would you like this activity to take place? (morning, afternoon, night)?

        2.  Would you like to do an activity outside or inside?

        3.  Are you doing this activity alone? (Alone, with others)

        4.  If you are with others, are you familiar with them? (N/A, yes I'm familiar, no I'm not familiar)

        5.  Would you consider yourself more of an introvert or an extrovert?

        6.  Do you like high-intensity activities? Or do you prefer something more laid-back?

        7.  Would you like food or drinks to be incorporated into the activity?

        8.  How long would you like to do this activity? (30min - 1hr, 2-3 hrs, 4+ hours)

        9.  Are you okay with needing to bring items for this activity? Or would you prefer to bring as few items as possible?

        10.  Would you prefer to spend money with this activity? (Free, some money, will spend money, no preference)


    The possible results can be (these can be adjusted and more refined):

        1.  If (laid-back, alone, short or long activity, free, inside, items needed): Read a book, play a video game, draw, other art

        2.  If (laid-back, with friends, outside, some money): Coffee shop, bookstore, art studio, park, hiking, farmer's market, museum, zoo/aquarium, friendly escape room

        3.  If (high-intensity, alone): skateboarding, nightclub, rock climbing/bouldering

        4.  If (high-intensity, with friends): concert, bar crawl, nightclub, amusement park, horror escape room

        5.  If (Inside, with friends, laid-back): video game, board game, movie marathon, baking

        More results may be added or more refined


- Schedule: A calendar function that acts similarly to a to-do list.  A calendar is in the browser, and if the activity is for a future date, it can be scheduled and appear as a flag on the calendar.  For ease-of-use, the user can insert the data themselves.  If it is made server side, it would have to check that the user likes the result they received from the quiz, and automatically add it after scheduling a vague day.  (User making own dates may be preferable) (otherwise can use local storage)

- Personal Note Taker: Reviews the activity and can leave other notes, such as individuals attending.

- Item checklist: Depending on the activity, if selected, will list basic items needed for said activity in a check box format.  Will include details like personal items, activity-specific items, and if teh activity is transaction-heavy (a little amount of money or a lot)


***********************

Potential future features:

- User can add their own activities and flag them with certain key words (such as 'high-intensity') or can add food ideas (+)

- Can utilize map API and potentially look at activities and/or food ideas in area (for user to view map, not the website)

- Additional quiz could be added specifically for food, done after activity is selected (+)
    - Hot or cold food?
    - Food or drink

    This will have a button and generate a random item, and button can be clicked multiple times and shuffle through items

    Hot food
    - Pizza
    - Miso soup
    - Hot sandwich
    - Pho
    -

    Cold food
    - Sushi
    - Cold sandwich
    - Pie
    - Ice cream

    Hot Drink
    - coffee
    - tea


    Cold drink
    - iced coffee/iced tea
    - water
    - soda





- Main page, no account needed, shows popular ideas



***********************

Phases for project:


Phase 1: Create basic landing page for website.  This will have the developer (not the AI) describe the webiste/app that is planned for the midterm.  No features are implemented yet.  Will have a repository on Github and be live on Netlify.  Will then test to see that deployment was successful.


Phase 2: Implements the MVP core features.  These will be the Activity Quiz, Schedule, Note Taker, and the Item Checklist.  These will be done one at a time, and tested after each major edit.  See specifications earlier in README.


Phase 2.5: Adds 'Complete Tier' features that implement a databse and user profiles.


Phase 3: Additional features are added.  These features are listed under "Potential future features", and every idea may not be added.  These will be done one at a time and tested regularly.


Phase 4: Final tests and CSS.  Any remaining testing can be done as a brief overview.  CSS shall be completed last, and will ensure that the website is responsive on at least three screen types: phone, tablet, and desktop.



***********************

CSS Styling

- Will be based on the color yellow, specifically #FEC601
- Accessible
- Responsive
