from app.models import db, Form, environment, SCHEMA
from sqlalchemy.sql import text


def seed_forms():
    form1 = Form(
        name='Credit Application', prophouse_id=1,
        url='https://property.warnerbros.com/download/WBSF%20Credit%20Application.pdf'
    )
    form2 = Form(
        name='Credit Card Authorization Form', prophouse_id=1,
        url='https://www.cognitoforms.com/WarnerBros/PropertyCreditCardAuthorizationForm'
    )
    form3 = Form(
        name='Insurance Requirements', prophouse_id=1,
        url='https://property.warnerbros.com/download/WBSF%20Sample%20Cert%20of%20Insurance.pdf'
    )
    form4 = Form(
        name='New Rental Process/Procedures', prophouse_id=2,
        url='https://props.universalstudios.com/download/New-Rental-Process-Procedures.pdf'
    )
    form5 = Form(
        name='Student Packet', prophouse_id=2,
        url='https://props.universalstudios.com/download/student-requirements.pdf'
    )
    form6 = Form(
        name='Universal W9', prophouse_id=2,
        url='https://props.universalstudios.com/download/Universal-W9.pdf'
    )
    form7 = Form(
        name='Credit Application', prophouse_id=3,
        url='https://hpr.com/wp-content/uploads/2022/06/hpr_credit_app-2022.pdf'
    )
    form8 = Form(
        name='Rental Agreement', prophouse_id=3,
        url='https://hpr.com/wp-content/uploads/2021/09/hpr_rental_agreement.pdf'
    )
    form9 = Form(
        name='Credit Card Auth', prophouse_id=3,
        url='https://hpr.com/wp-content/uploads/2022/03/hpr_credit_card_auth_policy-2022.pdf'
    )

    db.session.add(form1)
    db.session.add(form2)
    db.session.add(form3)
    db.session.add(form4)
    db.session.add(form5)
    db.session.add(form6)
    db.session.add(form7)
    db.session.add(form8)
    db.session.add(form9)
    db.session.commit()


def undo_forms():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.forms RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM forms"))

    db.session.commit()
