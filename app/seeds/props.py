from app.models import db, Prop, environment, SCHEMA
from sqlalchemy.sql import text


def seed_props():
    prop1 = Prop(
        prophouse_id=1,
        category_id=2,
        name='Oxford Red Chesterfield Leather Sofa',
        color='red',
        material='leather',
        length=37,
        depth=37,
        height=30,
        style='Chesterfield',
        quantity=3,
        weekly_price=130.00,
        availability=True,
        image='https://secure.img1-cg.wfcdn.com/im/61737973/resize-w750%5Ecompr-r85/1292/129285239/Freddie+Upholstered+Chesterfield+Chair.jpg')

    prop2 = Prop(
        prophouse_id=2,
        category_id=3,
        name='Large Barrel',
        color='brown',
        material='metal',
        description='rusted, can be reprinted, with a hinged lid',
        length=26,
        depth=20,
        height=33,
        style='vintage',
        quantity=4,
        weekly_price=83.00,
        availability=False,
        image='https://bascousa.com/pub/media/catalog/product/cache/8e80e1408c7336ee314dd53d1cc32b7c/4/5/457-l.jpg')

    prop3 = Prop(
        prophouse_id=1,
        category_id=4,
        name='Table',
        color='green',
        material='wood',
        description='console table, weight capacity about 100 lbs',
        length=60,
        depth=10,
        height=35,
        style='modern',
        quantity=1,
        weekly_price=240.00,
        availability=True,
        image='https://m.media-amazon.com/images/I/719O1o6n7qL._AC_SL1500_.jpg')

    prop4 = Prop(
        prophouse_id=2,
        category_id=6,
        name='Lamp',
        color='white',
        depth=8,
        height=45,
        style='contemporary',
        quantity=3,
        weekly_price=67,
        availability=True,
        image='https://mobileimages.lowes.com/productimages/08a83274-c383-466b-8476-d671a03d18fd/46323212.jpg')

    prop5 = Prop(
        prophouse_id=3,
        category_id=8,
        name='Beaded Curtains/Drapes',
        color='black and tan',
        length=32,
        depth=6,
        quantity=1,
        weekly_price=28,
        availability=False,
        image='https://property.warnerbros.com/Pictures/95/40001195.jpg')

    prop6 = Prop(
        prophouse_id=3,
        category_id=10,
        name='File Box',
        color='tan',
        material='paper',
        description='aged period paperwork file',
        quantity=20,
        weekly_price=10,
        availability=True,
        image='https://property.warnerbros.com/Pictures/22/07308822.jpg')

    prop7 = Prop(
        prophouse_id=1,
        category_id=11,
        name='Industrial Furniture',
        color='silver',
        material='metal',
        description='industrial four tiered shelf unit, galvanized',
        length=48,
        depth=24,
        height=78,
        quantity=1,
        weekly_price=75,
        availability=True,
        image='https://property.warnerbros.com/Pictures/77/07215977.jpg')

    prop8 = Prop(
        prophouse_id=1,
        category_id=4,
        name='End Table',
        color='brown and black',
        material='metal, wood',
        style='contemporary',
        depth=24,
        height=24,
        quantity=4,
        weekly_price=140,
        availability=True,
        image='https://property.warnerbros.com/Pictures/05/07345105.jpg')

    prop9 = Prop(
        prophouse_id=3,
        category_id=12,
        name='Blow Dryer',
        color='orange and black',
        material='plastic',
        quantity=1,
        weekly_price=9,
        availability=True,
        image='https://property.warnerbros.com/Pictures/39/07369139.jpg')

    db.session.add(prop1)
    db.session.add(prop2)
    db.session.add(prop3)
    db.session.add(prop4)
    db.session.add(prop5)
    db.session.add(prop6)
    db.session.add(prop7)
    db.session.add(prop8)
    db.session.add(prop9)
    db.session.commit()


def undo_props():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.props RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM props"))

    db.session.commit()
