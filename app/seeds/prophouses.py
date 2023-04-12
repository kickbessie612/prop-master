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
        phone='8189542181',
        logo='https://property.warnerbros.com/Images/SiteLogo.png',
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
        phone='8187772784',
        logo='https://props.universalstudios.com/Images/universal.png',
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
        phone='3239311534',
        logo='https://hpr.com/wp-content/uploads/2021/02/hpr-logo.png',
        facebook='https://www.facebook.com/thehandproproom/',
        twitter='https://twitter.com/handproproom',
        instagram='https://www.instagram.com/hprcan/',
        yelp='https://www.yelp.com/biz/the-hand-prop-room-los-angeles',
        embed_map='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.0281958644796!2d-118.36454948434559!3d34.0431478256558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b909358ac3f9%3A0x7a0943ea61f9fa0b!2sThe%20Hand%20Prop%20Room!5e0!3m2!1sen!2sus!4v1681181921542!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
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
