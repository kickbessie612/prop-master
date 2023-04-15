from app.models import db, Prophouse, environment, SCHEMA
from sqlalchemy.sql import text


def seed_prophouses():
    prophouse1 = Prophouse(
        name='The Warner Bros. Property Department',
        description='Warner Bros. Property Department includes modern, mid century, industrial and antique furniture, smalls, lighting and fixtures for all your set dressing needs.',
        address='4000 Warner Blvd., Bldg.30',
        city='Burbank',
        state='CA',
        zipcode='91552',
        phone='818.954.2181',
        logo='https://property.warnerbros.com/Images/SiteLogo.png',
        image='https://hpr.com/wp-content/uploads/2021/10/Antique-Pocket-Watches.jpg',
        introduction="""<p>The Collection is housed in the South end of the Property Department and offers a one-stop source for the most current furniture styles and trends, including lighting, accessories and smalls.</p>
        <br/>
        <p>We carry a large selection of contemporary, industrial, modern, unique and one-of-a kind finds gathered from top designers around Los Angeles and the world.</p>
        <br/>
        <p>We offer unique multiple seating and décor options for event planning or party rentals as well. There is always something new at The Collection, we are adding items every week, come by and see what has just arrived!</p>""",
        twitter='https://twitter.com/wbpropertydept',
        instagram='https://www.instagram.com/wbpropertydept/',
        pinterest='https://www.pinterest.com/wbpropertydept/',
        embed_map='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.906434614387!2d-118.34087498434374!3d34.14873582008541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf491844a653%3A0x71eb37047a4ebd91!2sWarner%20Bros.%20Property%20Department!5e0!3m2!1sen!2sus!4v1681181804179!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        monday_open=6,
        monday_close=18,
        tuesday_open=6,
        tuesday_close=18,
        wednesday_open=6,
        wednesday_close=18,
        thursday_open=6,
        thursday_close=18,
        friday_open=6,
        friday_close=18
    )
    prophouse2 = Prophouse(
        name='Universal Studios Property Department',
        description='The Universal Studios Property Department offers one of the largest, most diverse collections of props for all your production needs, including new media, student productions, and events. The department began over a hundred years ago and is regularly refreshed with new stock from Universal productions.',
        address='100 Universal City Plaza, Bldg 8166/1',
        city='Universal City',
        state='CA',
        zipcode='91608',
        phone='818.777.2784',
        logo='https://props.universalstudios.com/Images/universal.png',
        image='https://hpr.com/wp-content/uploads/2022/01/design-it-image-003.jpg',
        introduction="""<p>The main self-service warehouse spans three floors with 100,000 square feet and another 25,000 square feet of inventory housed on the backlot, including: furniture, household items, office and restaurant equipment, hardware, light fixtures, handprops, statues and more.</p>
        <br/>
        <p>We also provide the following professional services on tight production timelines with competitive pricing:</p>
        <br/>
        <p>Staff Shop for custom fabrication and construction of flex moldings, fiberglass casting, vac-u-form, plastering, sculpting, and additional specialty services. Graphic Design & Sign Shop can make your ideas become a reality utilizing an array of digital equipment and old fashioned sign making skills.</p>""",
        embed_map='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.184298092698!2d-118.35012986809852!3d34.14162675836218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf9580ad2283%3A0xc2bedeac0ff96a03!2sUniversal%20Studios%20Property%20%26%20Drapery%20Department!5e0!3m2!1sen!2sus!4v1681181852517!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        monday_open=6,
        monday_close=17,
        tuesday_open=6,
        tuesday_close=17,
        wednesday_open=6,
        wednesday_close=17,
        thursday_open=6,
        thursday_close=17,
        friday_open=6,
        friday_close=17
    )
    prophouse3 = Prophouse(
        name='The Hand Prop Room',
        description='For over four decades, The Hand Prop Room has been dedicated to providing the finest merchandise and exceptional service to all of our clients.',
        address='5700 Venice Blvd',
        city='Los Angeles',
        state='CA',
        zipcode='90019',
        phone='323.931.1534',
        logo='https://hpr.com/wp-content/uploads/2021/02/hpr-logo.png',
        image='https://hpr.com/wp-content/uploads/2021/10/Custom-Manufacturing.jpg',
        introduction="""<p>We have always maintained certain guiding principles: Accurate research, authenticity and our willingness to search from one end of the globe to the other to find exactly what our customers require.</p>
        <br/>
        <p>We have remained at the forefront of the industry because of our ability to function as a full-service facility. From over 1,000,000 props on hand in our rental department, to our exciting and creative graphics department, along with our custom manufacturing facility and a fully outfitted arsenal, we are able to service any type of production with any type of budget. We welcome the excitement new and challenging productions offer.</p>""",
        facebook='https://www.facebook.com/thehandproproom/',
        twitter='https://twitter.com/handproproom',
        instagram='https://www.instagram.com/hprcan/',
        yelp='https://www.yelp.com/biz/the-hand-prop-room-los-angeles',
        embed_map='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.028196154775!2d-118.36493572351623!3d34.04314781820911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b909358ac3f9%3A0x7a0943ea61f9fa0b!2sThe%20Hand%20Prop%20Room!5e0!3m2!1sen!2sus!4v1681535263021!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        monday_open=7,
        monday_close=17,
        tuesday_open=7,
        tuesday_close=17,
        wednesday_open=7,
        wednesday_close=17,
        thursday_open=7,
        thursday_close=17,
        friday_open=7,
        friday_close=17
    )

    db.session.add(prophouse1)
    db.session.add(prophouse2)
    db.session.add(prophouse3)
    db.session.commit()


def undo_prophouses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.prophouses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM prophouses"))

    db.session.commit()
