package com.sc.ppevents;

import android.content.Context;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.sc.ppevents.view.RealViewSwitcher;

public class PageViewHandler {

	private Context context;
	private int pageCount;
	private LinearCenterImageView linearCenterImageView;

	public PageViewHandler(Context context) {
		this.context = context;
		linearCenterImageView = new LinearCenterImageView(context);
	}

	public void createPages(RealViewSwitcher realViewSwitcher) {
		pageCount = 0;
		realViewSwitcher.addView(createView("9 or 12 Rabi-ul-Awwal\n52 or 53 BH April\n570 or 571 AD", "Prophet PBUH was born", "The Holy Prophet of Islam, Muhammad Sallallaahu Ãlayhi Wasallam, born an orphan His father Abdullah, had died a few months before the birth of his son."));
		realViewSwitcher.addView(createView("570 or 571 AD", "8 days", "Hadrat Halima Sadiyya, appointed wet nurse."));
		realViewSwitcher.addView(createView("46 BH 577 AD", "6 Years", "Return to Makkah under the care of his Mother."));
		realViewSwitcher.addView(createView("46 BH 577 AD", "6 Years", "Mother, Hadrat Amina, passes away."));
		realViewSwitcher.addView(createView("44 BH 579 AD", "8 Years", "Grandfather, Hadrat Abdul-Muttalib died."));
		realViewSwitcher.addView(createView("40 BH 583 AD", "12 Years", "First visit to Syria with a trading caravan 12 years 40 BH, 583 AD."));
		realViewSwitcher.addView(createView("37 BH 586 AD", "15 Years", "Pledge of Fudul to help the needy and the oppressed."));
		realViewSwitcher.addView(createView("28 BH 595 AD", "25 Years", "Second journey to Syria for trade as an agent of Hadrat Khadija, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("28 BH 595 AD", "25 Years", "Marriage with Hadrat Khadija, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("25 BH 598 AD", "28 Years", "Birth of a son, Hadrat Qasim (Radhi Allaahu anhu)."));
		realViewSwitcher.addView(createView("23 BH 600 AD", "30 Years", "Birth of his daughter, Hadrat Zainab, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("20 BH 603 AD", "33 Years", "Birth of his daughter, Hadrat Ruqayya, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("19 BH 604 AD", "34 years", "Birth of his daughter, Hadrat Um-e-Kalthum, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("18 BH 605 AD", "35 years", "Renovation of Ka'aba and the placement of Hajr-e-Aswad (Black Stone)."));
		realViewSwitcher.addView(createView("18 BH 605 AD", "35 years", "Birth of his daughter, Hadrat Fatima, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("12 BH 610 AD", "40 Years", "Hadrat Jibrail bought the First Revelation in the Cave of Hira."));
		realViewSwitcher.addView(createView("Friday 18 Ramadan 12 BH 14 August 610 AD", "40 Years 6 months", "Revelation of the Holy Qur’aan continues, Ministry of the Holy Prophet Muhammad Sallallaahu Ãlayhi Wasallam is established. Hadrat Khadija (the wife), Hadrat Abu Bakr (the best friend), Hadrat Ali (the dearest cousin) and Hadrat Zaid (a freed slave and adopted son), (Radhi Allaahu anhum)ll, Accept Islam."));
		realViewSwitcher.addView(createView("9 BH 614 AD", "43 Years", "Open invitation to the people of Makkah to join Islam under Allaah's command."));
		realViewSwitcher.addView(createView("7 BH 615 AD", "46 Years", "A group of Muslims emigrates to Abyssinia."));
		realViewSwitcher.addView(createView("7 BH 30 September 615 AD", "46 Years", "Blockade of Shi'b Abi-Talib."));
		realViewSwitcher.addView(createView("6 BH 616 AD", "46 Years", "Hadrat Hamza (paternal uncle) and Hadrat Umar, (Radhi Allaahu anhum), accept Islam."));
		realViewSwitcher.addView(createView("Ramadan 3 BH January 619 AD", "49 Years", "Hadrat Abu Talib, (beloved uncle and guardian) and only a few days later, Hadrat Khadija, the most beloved wife, (Radhi Allaahu anha), passed away."));
		realViewSwitcher.addView(createView("3 BH 619 AD", "49 Years", "Marriage with Hadrat Sau'da, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("3 BH 619 AD", "49 Years", "Marriage with Hadrat Aisha, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("3 BH 619 AD", "49 Years", "Journey to Ta'if, about 40 miles from Makkah, for calling the citizens of Ta'if to Islam."));
		realViewSwitcher.addView(createView("27 Rajab 2 BH 8 March 620 AD", "50 Years", "Journey of Mi'raj. Five daily prayers made Obligatory for Muslims."));
		realViewSwitcher.addView(createView("2 BH 620 AD", "50 Years", "Deputation from Medina accepts Islam."));
		realViewSwitcher.addView(createView("Dhul Haj, 1 BH 621 AD", "52 Years", "First Pledge of 'Aq'ba'."));
		realViewSwitcher.addView(createView("3 months BH June 622 AD", "52 Years", "Second Pledge of 'Aq'ba."));
		realViewSwitcher.addView(createView("Friday 27 Safar 10 September 622", "52 Years", "Hijra (migration) from Makkah to the cave of Thaur."));
		realViewSwitcher.addView(createView("Monday 1 Rabi-ul-Awwal 13 September 622 AD", "52 Years", "Emigration to Medina begins."));
		realViewSwitcher.addView(createView("12 Rabi-ul-Awwal 1st year AH 24 September 622 AD", "53 Years", "Arrival at Medina after the first Friday Prayer at Quba's Masjid."));
		realViewSwitcher.addView(createView("1st year AH 622 AD", "53 Years", "Construction of the Holy Prophet's Masjid at Medina . Hadrat Bilal's call for Prayer (Adhan)."));
		realViewSwitcher.addView(createView("1st year AH 622 AD", "53 Years", "Brotherhood pacts between Ansar (Muslims from Medina ) and Muhajirin (immigrants from Makkah)."));
		realViewSwitcher.addView(createView("1st year AH", "53 Years", "Treaty with Jews of Madinah."));
		realViewSwitcher.addView(createView("12 Safar 2 AH 14 August 623 AD", "53 Years", "Permission to fight in self-defense is granted by Allaah."));
		realViewSwitcher.addView(createView("29 Safar 2 AH 31 August 623 AD", "53 Years", "Ghazwa ( Battle ) of Waddan."));
		realViewSwitcher.addView(createView("2 AH 623 AD", "54 Years", "Ghazwa ( Battle ) of Safwan."));
		realViewSwitcher.addView(createView("2 AH 623 AD", "54 Years", "Ghazwa ( Battle ) Dul-'Ashir."));
		realViewSwitcher.addView(createView("2 AH 623 AD", "54 Years", "Hadrat Salman Farsi, (Radhi Allaahu anha), accepts Islam."));
		realViewSwitcher.addView(createView("Sha'abn 2 AH February 624 AD", "54 Years", "Revelation and change of Qibla (direction to face for Formal Prayers, Salat) towards Ka'ba Fasting in the month of Ramadan becomes obligatory."));
		realViewSwitcher.addView(createView("12-17 Ramadan 2 AH March 8-13, 624 AD", "54 Years", "Ghazwa ( Battle ) of Badr."));
		realViewSwitcher.addView(createView("25 Ramadan 2 AH 21 March 524 AD", "54 Years", "Ghazwa ( Battle ) of Bani Salim."));
		realViewSwitcher.addView(createView("28 Ramadan / 1 Shawwal 2 AH 24/25 March 624 AD", "54 Years", "Initiation of Eid-ul-Fitr and Zakat-ul-Fitr (Alms at the Eid-ul-Fitr)."));
		realViewSwitcher.addView(createView("Shawwal 2 AH April 624 AD", "54 Years", "Zakat becomes obligatory for Muslims."));
		realViewSwitcher.addView(createView("Shawwal 2 AH April 624 AD", "54 Years", "Nikah and Marriage ceremony of Hadrat Fatima, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("15 Shawwal 2 AH 10 April 624 AD", "54 Years", "Ghazwa ( Battle ) of Bani Qainuqa'."));
		realViewSwitcher.addView(createView("5 Dhul-Haj 2 AH 29 May 624 AD", "54 Years", "Ghazwa ( Battle ) of Sawiq."));
		realViewSwitcher.addView(createView("Muharram 3 AH July 624 AD", "54 Years", "Ghazwa ( Battle ) of Ghatfan."));
		realViewSwitcher.addView(createView("Rabi-us-Sani 3 AH October 624 AD", "55 Years", "Ghazwa ( Battle ) of Bahran."));
		realViewSwitcher.addView(createView("Shaban 3 AH January 625 AD", "55 Years", "Marriage with Hadrat Hafsa, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("6 Shawwal 3 AH 22 March 625", "55 Years", "Ghazwa ( Battle ) of Uhad."));
		realViewSwitcher.addView(createView("8 Shawwal 3 AH 24 March 625 AD", "55 Years", "Ghazwa ( Battle ) of Humra-ul-Asad."));
		realViewSwitcher.addView(createView("Dhul-Haj 3 AH May 625 AD", "55 Years", "Marriage with Hadrat Zainab Bint Khazima, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("Rabi-ul-Awwal 4 AH August 625 AD", "56 Years", "Ghazwa ( Battle ) of Banu Nudair."));
		realViewSwitcher.addView(createView("Rabi-ul-Awwal 4 AH August 625 AD", "56 Years", "Prohibition of Drinking in Islam."));
		realViewSwitcher.addView(createView("Jamadi-ul-Awwal 4 AH October 625 AD", "56 Years", "Ghazwa ( Battle ) of Dhatur-Riqa."));
		realViewSwitcher.addView(createView("Shawwal 4 AH March 626 AD", "56 Years", "Marriage with Hadrat Um-e-Salma, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("Dhi Qad 4 AH April 626", "56 Years", "Ghazwa ( Battle ) of Badru-Ukhra."));
		realViewSwitcher.addView(createView("25 Rabi-ul-Awwal 5 AH", "57 Years", "Ghazwa ( Battle ) of Dumatul-Jandal."));
		realViewSwitcher.addView(createView("3 Shaban 5 AH 28 December 626 AD", "57 Years", "Ghazwa ( Battle ) of Banu Mustalaq Nikah with Hadrat Jawariya bint Harith, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("Shawwal 5 AH February 627 AD", "57 Years", "Marriage with Hadrat Zainab bint Hajash, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("1 Dhi Qa'd 5 AH 24 March 627 AD", "57 Years", "Revelation for Hijab, rules of Modesty."));
		realViewSwitcher.addView(createView("8 Dhi Qa'd 5 AH 31 March 627 AD", "57 Years", "Ghazwa ( Battle ) of Ahzab or Khandaq (Ditch)."));
		realViewSwitcher.addView(createView("Dhul-Haj 5 AH April 627 AD", "57 Years", "Ghazwa ( Battle ) of Bani Quraiza."));
		realViewSwitcher.addView(createView("1 Rabi-ul-Awwal 6A H 21 July 627 AD", "57 Years", "Ghazwa ( Battle ) of Bani Lahyan."));
		realViewSwitcher.addView(createView("Rabi-ul-Akhar 6 AH August 627 AD", "58 Years", "Ghazwa ( Battle ) of Dhi Qard or Ghaiba."));
		realViewSwitcher.addView(createView("1 Dhi Qa'd 6 AH 13 March 628 AD", "58 Years", "Treaty of Hudaibiyya."));
		realViewSwitcher.addView(createView("Dhi Qa'd 6 AH March 628 AD", "58 Years", "Prohibition of Marriage with non-Believers."));
		realViewSwitcher.addView(createView("Dhul-Haj 6 AH April 628 AD", "58 Years", "Marriage with Hadrat Habiba, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("1 Muharram 7AH May 628 AD", "58 Years", "Invitation sent to various rulers to Accept Islam."));
		realViewSwitcher.addView(createView("Muharram 7 AH June 628 AD", "58 Years", "Ghazwa ( Battle ) of Khaibar Return of Muslims from Abyssinia . Marriage with Hadrat Safiyya, (Radhi Allaahu anha). Ghazwa ( Battle ) of Wadiyul-Qura and Taim."));
		realViewSwitcher.addView(createView("Dhi Qa'd 7 AH March 629 AD", "59 Years", "Performance of Umra (Umratul-Qada) Marriage with Hadrat Maimuna, (Radhi Allaahu anha)."));
		realViewSwitcher.addView(createView("Safar 8 AH June 629 AD", "60 Years", "Hadrat Khalid bin Walid and Hadrat Umar bin Al-'Aas, (Radhi Allaahu anhum), accept Islam."));
		realViewSwitcher.addView(createView("Jamadi-ul-Awwal 8 AH August 629 AD", "60 Years", "Ghazwa of Muta."));
		realViewSwitcher.addView(createView("10 Ramadan 8 AH 1 January 630 AD", "60 Years", "Ghazwa ( Battle ) of Makkah and Fall of Makkah."));
		realViewSwitcher.addView(createView("Shawwal 8 AH January 630 AD", "60 Years", "Ghazwa ( Battle ) of Hunain (or Autas or Hawazan) and Ghazwa ( Battle ) of Bar-e-Ta'if."));
		realViewSwitcher.addView(createView("5 Dhi Qa'd 8 AH 24 February 630 AD", "60 Years", "Arrival in Ja'rana Deputation from Hawazan accepts Islam."));
		realViewSwitcher.addView(createView("Muharram, 9 AH April 630 AD", "60 Years", "Regular establishment of Department of Zakat (Alms) and Sadaqa (Charity), and appointment of administrative officers."));
		realViewSwitcher.addView(createView("Safar 9 AH May 630 AD", "60 Years", "Deputation from Ghadra accepts Islam."));
		realViewSwitcher.addView(createView("Rabi-ul-Awwal, 9 AH June 630 AD", "61 Years", "Deputation from Balli accepts Islam."));
		realViewSwitcher.addView(createView("Jamadi-ul-Akhar, 9 AH August 630 AD", "61 Years", "Ummul-Muminin Hadrat Mariya, (Radhi Allaahu anha), gave birth to a son, Hadrat Ibrahim, (Radhi Allaahu anhu)."));
		realViewSwitcher.addView(createView("Rajab, 9AH October 630 AD", "61 Years", "Ghazwa ( Battle ) of Tabuk, the Last Great Battle lead by the Holy Prophet Muhammad Sallallaahu Ãlayhi-e-Wasallam."));
		realViewSwitcher.addView(createView("Rajab 9 AHOctober 630 AD", "61 Years", "Ordinance of Jizya, tax on non-believers seeking protection from Muslims and exemption from military service in defense of the country they were living in as its citizens."));
		realViewSwitcher.addView(createView("Dhi Qa'd, 9 AHFebruary 631 AD", "61 Years", "Pilgrimage journey of Hadrat Abu Bakr Siddique, (Radhi Allaahu anhu)."));
		realViewSwitcher.addView(createView("Deputation Tai, Hamadan, Bani Asad and Bani Abbas, all accept Islam", "61 Years", "Hajj (pilgrimage of Ka'ba in Makkah) made Obligatory by Allaah Subhanahoo Wa Ta’aala & Interest is prohibited in Islam."));
		realViewSwitcher.addView(createView("Ramadan, 10AH 631 AD", "62 Years", "Deputation from Ghuttan accepts Islam."));
		realViewSwitcher.addView(createView("25 Dhi Qa'd 10 AH 23 February 632 AD", "62 Years", "Departure from Medina for Makkah for Hajjatul-Wida (Farewell Pilgrimage)."));
		realViewSwitcher.addView(createView("4 Dhul-Haj 10 AH 1 March 632 AD", "62 Years", "Entry into Makkah for Hajjatul-Wida (Farewell Pilgrimage)."));
		realViewSwitcher.addView(createView("Friday 9 Dhul Hajj 10 AH 6 March 632 AD", "62 Years", "Hajjatul-Wida, departure for 'Arafat, Farewell Sermon Received the last revelation from Allaah Ta’aala."));
		realViewSwitcher.addView(createView("13 Dhul-Hajj 10 AH 10 March 632 AD", "62 Years", "Return from Mana, Hajjatul-Wida."));
		realViewSwitcher.addView(createView("15 Muharram 11 AH 11 April 632 AD", "62 Years", "Arrival of deputations from Nakha’ Last deputation received by the Holy Prophet Sallallaahu Ãlayhi Wasallam."));
		realViewSwitcher.addView(createView("28 Safar 11 AH 24 May 632 AD", "62 Years", "Sarya Usama bin Zaid, (Radhi Allaahu anhu), last successful military mission during the Holy Prophet’s life."));
		realViewSwitcher.addView(createView("Monday 29 Safar 11 AH 25 May 632 AD", "62 Years", "The Holy Prophet Muhammad Sallallaahu Ãlayhi Wasallam, falls ill."));
		realViewSwitcher.addView(createView("Wednesday 5 Rabi-ul-Awwal 11 AH 3 June 632 AD", "62 Years", "The Holy Prophet Muhammdad Sallallaahu Ãlayhi Wasallam, lead the last Salah four days before His departure from this world."));
		realViewSwitcher.addView(createView("Monday 7, 9, or 12 Rabi-ul-Awwal 11 AH 8 June 632 AD", "63 Years", "The Holy Prophet Sallallaahu Ãlayhi Wasallam, offered His last Prayer in congregation in the Masjid lead by Hadrat Abu Bakr, (Radhi Allaahu anhu)."));
		realViewSwitcher.addView(createView("Inna lillahe wa inna elaihe rajioon", "63 Years", "Departure of the Holy Prophet Sallallaahu Ãlayhi Wasallam from this world."));
		realViewSwitcher.addView(createView("Wednesday Rabi-ul-Awwal 11 AH 10 June 632 AD", "63 Years", "Janaza (funeral) Prayer Prophet Muhammdad Sallallaahu Ãlayhi Wasallam and burial."));
	}

	private View createView(String header, String subHeader, String description) {

		FrameLayout frameLayout = new FrameLayout(context);
		TextView pageNumberTextView = new TextView(context);
		pageNumberTextView.setPadding(5, 5, 5, 5);
		pageNumberTextView.setText("Page " + (++pageCount));
		FrameLayout.LayoutParams pageNumberLayoutParams = new FrameLayout.LayoutParams(
				FrameLayout.LayoutParams.WRAP_CONTENT,
				FrameLayout.LayoutParams.WRAP_CONTENT);
		pageNumberLayoutParams.gravity = Gravity.TOP
				| Gravity.CENTER_HORIZONTAL;
		pageNumberTextView.setLayoutParams(pageNumberLayoutParams);
		frameLayout.addView(pageNumberTextView);

		LinearLayout informationView = new LinearLayout(context);
		informationView.setOrientation(LinearLayout.VERTICAL);
		FrameLayout.LayoutParams informationViewLayoutParams = new FrameLayout.LayoutParams(
				FrameLayout.LayoutParams.WRAP_CONTENT,
				FrameLayout.LayoutParams.WRAP_CONTENT);
		informationViewLayoutParams.gravity = Gravity.CENTER;
		informationViewLayoutParams.setMargins(25, 0, 25, 0);
		informationView.setLayoutParams(informationViewLayoutParams);
		frameLayout.addView(informationView);

		TextView headerTextView = new TextView(context);
		headerTextView.setText(header);
		headerTextView.setTextSize(20);
		headerTextView.setTypeface(null, Typeface.BOLD);
		headerTextView.setGravity(Gravity.CENTER_HORIZONTAL);
		headerTextView.setTextColor(0xff17395c);
		informationView.addView(headerTextView);

		TextView subHeaderTextView = new TextView(context);
		subHeaderTextView.setText(subHeader);
		subHeaderTextView.setTextSize(18);
		subHeaderTextView.setGravity(Gravity.CENTER);
		informationView.addView(subHeaderTextView);

		TextView descriptionTextView = new TextView(context);
		descriptionTextView.setText(description);
		descriptionTextView.setTextSize(18);
		descriptionTextView.setGravity(Gravity.CENTER);
		informationView.addView(descriptionTextView);

		informationView.addView(createBottomImageView());

		return frameLayout;
	}

	private View createBottomImageView() {
		return linearCenterImageView.createHorizontalCenterImageView(R.drawable.pattern, 20, 25);
	}
}
