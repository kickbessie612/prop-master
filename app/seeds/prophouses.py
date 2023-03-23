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
        pinterest='https://www.pinterest.com/wbpropertydept/'
    )
    prophouse2 = Prophouse(
        name='Universal Studios Property Department',
        description='The Universal Studios Property Department offers one of the largest, most diverse collections of props for all your production needs, including new media, student productions, and events. The department began over a hundred years ago and is regularly refreshed with new stock from Universal productions.',
        address='100 Universal City Plaza, Bldg 8166/1',
        city='Universal City',
        state='CA',
        zipcode='91608',
        phone='8187772784',
        logo='https://props.universalstudios.com/Images/universal.png'
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
        yelp='https://www.yelp.com/biz/the-hand-prop-room-los-angeles'
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
