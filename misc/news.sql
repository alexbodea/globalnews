-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Gazda: 127.0.0.1
-- Timp de generare: 29 Sep 2014 la 13:17
-- Versiune server: 5.5.27
-- Versiune PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza de date: `news`
--

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `locale`
--

CREATE TABLE IF NOT EXISTS `locale` (
  `us` varchar(255) CHARACTER SET utf8 NOT NULL,
  `ro` varchar(255) CHARACTER SET utf8 NOT NULL,
  `fr` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `locale`
--

INSERT INTO `locale` (`us`, `ro`, `fr`) VALUES
('Home', 'Acasă', 'Accueil'),
('Country', 'Ţara', 'Pays'),
('About', 'Despre', 'Contact'),
('Read more', 'Citeşte mai mult', 'En savoir plus');

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 NOT NULL,
  `title` varchar(255) CHARACTER SET utf16 NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `link` varchar(255) CHARACTER SET utf8 NOT NULL,
  `pubdate` varchar(255) CHARACTER SET utf8 NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=258 ;

--
-- Salvarea datelor din tabel `news`
--

INSERT INTO `news` (`id`, `country_id`, `author`, `title`, `description`, `link`, `pubdate`, `views`) VALUES
(173, 2, 'cnn.com', 'Iran President: ISIS airstrikes ''theater''', 'Airstrikes against ISIS militants are a "psychological operation," not a military one, Iranian President Hassan Rouhani told CNN''s Christiane Amanpour in an interview that aired Friday.', 'http://edition.cnn.com/2014/09/26/world/meast/iran-president-amanpour-interview/index.html?eref=edition', '2014.09.29', 0),
(174, 2, 'cnn.com', 'Why Modi''s U.S. visit matters', 'When Indian Prime Minister Narendra Modi visits the White House next week, he will carry with him grand hopes for a re-energized partnership between his country and the United States. Fresh off a landslide victory in the Indian elections, Modi has seized an outright majority in parliament and a mandate for sweeping domestic reform. For years, the former chief minister of Gujarat faced an American visa ban due to his alleged role in violent riots. Now, the new premier''s visit represents a key opportunity to recharge a critical bilateral relationship.', 'http://edition.cnn.com/2014/09/28/opinion/fontaine-modi-visit/index.html?eref=edition', '2014.09.29', 0),
(175, 2, 'cnn.com', 'After night of tear gas, Hong Kong protesters dig in', 'Pro-democracy protesters remain camped out in Hong Kong, defying government attempts to persuade them to give up their demonstration.', 'http://edition.cnn.com/2014/09/29/world/asia/china-hong-kong-protests/index.html?eref=edition', '2014.09.29', 0),
(176, 2, 'cnn.com', 'Who is student leader Joshua Wong?', 'He''s one of the fieriest political activists in Hong Kong — he''s been called an "extremist" by China''s state-run media — and he''s not even old enough to drive.', 'http://edition.cnn.com/2014/09/21/world/asia/hong-kong-joshua-wong-democracy-protest/index.html?eref=edition', '2014.09.29', 0),
(177, 2, 'cnn.com', 'Opinion: HK leader writes for CNN', 'C.Y. Leung, Hong Kong''s leader, writes the pro-democracy protests gripping the territory reflect a passionate, vital debate -- but one that must be tempered with reason.', 'http://edition.cnn.com/2014/09/27/opinion/hong-kong-oped-cy-leung/index.html?eref=edition', '2014.09.29', 0),
(178, 2, 'cnn.com', '36 feared dead after volcano erupts', 'Five more lifeless bodies have been found on the slopes of Japan''s Mount Ontake, bringing the total number of presumed dead in a volcanic eruption Saturday to 36.', 'http://edition.cnn.com/2014/09/29/world/asia/japan-volcano-ontake/index.html?eref=edition', '2014.09.29', 0),
(179, 2, 'cnn.com', 'Ghani sworn in as Afghan president', 'Ashraf Ghani was sworn in as the new President of Afghanistan on Monday, sealing the country''s first peaceful democratic transition of power.', 'http://edition.cnn.com/2014/09/29/world/asia/afghanistan-politics/index.html?eref=edition', '2014.09.29', 0),
(180, 2, 'cnn.com', 'Cheers as Lenin statue falls', 'Crowds in Eastern Ukraine cheered as a the largest statue of Vladimir Lenin in the country was pulled down.', 'http://edition.cnn.com/video/data/2.0/video/world/2014/09/29/vo-ukraine-lenin-statue-toppled.cnn.html?eref=edition', '2014.09.29', 0),
(181, 2, 'cnn.com', 'Belgium terror trial to start', 'CNN''s Atika Shubert reports a jihadist recruit who returned home to Belgium is expected to be a key witness at the trial.', 'http://edition.cnn.com/video/data/2.0/video/world/2014/09/29/pkg-shubert-belgium-terror-trial.cnn.html?eref=edition', '2014.09.29', 0),
(182, 2, 'cnn.com', 'Flight chaos after fire ''sabotage''', 'The effects of an employee''s attempted suicide and alleged sabotage of the Illinois air traffic control center where he worked stretched into a second day.', 'http://edition.cnn.com/2014/09/27/travel/chicago-ohare-midway-flights-stopped/index.html?eref=edition', '2014.09.29', 0),
(183, 2, 'cnn.com', 'Europe wins Ryder Cup', 'Europe withstood an early fightback from the United States to retain the Ryder Cup at Gleneagles Sunday and secure an eighth win in the last 10 stagings of the biennial team competition.', 'http://edition.cnn.com/2014/09/28/sport/golf/ryder-cup-gleneagles-europe-wins/index.html?eref=edition', '2014.09.29', 0),
(184, 2, 'cnn.com', 'How coral is being used to ''grow bones''', 'Why tanks in the desert with fish as "worker bees" could change medical procedures forever.', 'http://edition.cnn.com/2014/09/28/business/inside-a-million-dollar-coral-farm/index.html?eref=edition', '2014.09.29', 0),
(185, 2, 'cnn.com', 'Most spectacular buildings of 2014', 'Zaha Hadid''s spaceship-like Dongdaemun Design Plaza, an avant-garde new home for Singapore''s oldest Buddhist Temple, and a private bunker sprawling on top of a lake are some of the shortlisted entries competing for architectural honors at the World Architecture Festival in Singapore this week.', 'http://edition.cnn.com/2014/09/28/travel/world-architecture-festival-2014/index.html?eref=edition', '2014.09.29', 0),
(186, 2, 'cnn.com', 'Gleneagles: Europe triumphs over U.S.', 'Europe withstands early U.S. fightback to keep Ryder Cup.', 'http://edition.cnn.com/2014/09/28/sport/golf/ryder-cup-gleneagles-europe-wins/index.html?eref=edition', '2014.09.29', 0),
(187, 2, 'cnn.com', 'The cost of losing in North Korea', 'Defector Choi Hyun Mi recalls the shame heaped on fellow boxers who failed to win.', 'http://edition.cnn.com/2014/09/29/world/asia/north-korea-defector-boxer/index.html?eref=edition', '2014.09.29', 0),
(188, 2, 'cnn.com', 'Bodies pulled from mouth of volcano', 'Rescue crews rush to retrieve bodies of hikers caught in eruption.', 'http://edition.cnn.com/2014/09/28/world/asia/japan-volcano-ontake/index.html?eref=edition', '2014.09.29', 0),
(189, 2, 'cnn.com', 'World''s deepest pool. Mind your goggles', 'Yes it''s a dive hotel, but not that kind of dive hotel.', 'http://edition.cnn.com/2014/09/25/travel/deep-swimming-pool/index.html?eref=edition', '2014.09.29', 0),
(190, 2, 'cnn.com', 'ISIS fighter: U.S. airstrikes ineffective', 'One of the terror group''s fighters says U.S. hits are trivial at best.', 'http://edition.cnn.com/2014/09/29/world/meast/isis-fighter-and-defector-interviews/index.html?eref=edition', '2014.09.29', 0),
(191, 2, 'cnn.com', 'A glimpse of life in ISIS', 'Two men familiar with inside knowledge of ISIS speak with CNN''s Arwa Damon.', 'http://edition.cnn.com/video/data/2.0/video/world/2014/09/29/pkg-damon-syria-isis-insider.cnn.html?eref=edition', '2014.09.29', 0),
(192, 2, 'cnn.com', 'Word from the street in Hong Kong', 'Some stayed up all night, dodging tear gas as riot police tried to disperse pro-democracy protesters. Others woke up to find road blocks, their routines disrupted.', 'http://edition.cnn.com/2014/09/29/asia/gallery/hong-kong-quotes/index.html?eref=edition', '2014.09.29', 0),
(193, 2, 'cnn.com', 'What do Hong Kong protesters want?', 'Beijing is watching events in Hong Kong very closely as protesters succeed in disrupting the city center in their push for democracy.', 'http://edition.cnn.com/2014/09/27/world/asia/hong-kong-five-things/index.html?eref=edition', '2014.09.29', 0),
(194, 2, 'cnn.com', 'How does Beijing view protests?', 'CNN''s Andrew Stevens asks China analyst Victor Gao about the view of Hong Kong protests in Beijing.', 'http://edition.cnn.com/video/data/2.0/video/world/2014/09/29/stevens-intv-gao-hk-china-view.cnn.html?eref=edition', '2014.09.29', 0),
(195, 2, 'cnn.com', 'Hong Kong protests', 'Faced with continued silence from Hong Kong''s top administrator, the city''s pro-democracy movement has said: enough is enough. ', 'http://edition.cnn.com/2014/09/28/world/asia/china-hong-kong-students/index.html?eref=edition', '2014.09.29', 0),
(196, 2, 'cnn.com', 'Hong Kong: Why protest?', 'Hong Kong is in the midst of its longest series of political protests since the 1997 handover.', 'http://edition.cnn.com/2014/09/27/world/asia/hong-kong-five-things/index.html?eref=edition', '2014.09.29', 0),
(197, 2, 'yelp.com', 'Adele W.''s Review of Ross & Asmar LLC - New York (5/5) on Yelp', 'I must say that I am completely satisifed and glad with Ross & Asmar LLC Company.', 'http://www.yelp.com/biz/ross-and-asmar-llc-new-york-3?hrid=s8WZRpziyXvJpYR80QoT5A', '2014.09.29', 0),
(198, 2, 'yelp.com', 'Dania L.''s Review of Luke''s Lobster - New York (4/5) on Yelp', 'I affirm every positive review about the lobster roll. I agree that the lobster here is equally as tasty as any I''ve had in New England. My husband and I enjoyed sitting at the outside tables and…', 'http://www.yelp.com/biz/lukes-lobster-new-york-5?hrid=Rh808unE60Ije3gllmzydg', '2014.09.29', 0),
(199, 2, 'yelp.com', 'Paul H.''s Review of Brooklyn Heights Wine Bar - Brooklyn (4/5) on Yelp', 'Great little wine bar not far from the base of the Brooklyn Bridge. We showed up with a party of six on a Saturday night without a reservation. Thought we''d have an hour wait, but the host was…', 'http://www.yelp.com/biz/brooklyn-heights-wine-bar-brooklyn?hrid=NacYcbeR9pqCLzrSF9t53Q', '2014.09.29', 0),
(200, 2, 'yelp.com', 'Alexander N.''s Review of Juniper - Brooklyn (5/5) on Yelp', 'Had the truffle burger with added cheddar and bacon, and with spicy fries.\n\nThe burger was perfect, with close to the best buns I have ever had. The fries was crispy and tasted delicious.\n\nWe knew the…', 'http://www.yelp.com/biz/juniper-brooklyn-2?hrid=oeDBOb3waRDLx70DU79ajw', '2014.09.29', 0),
(201, 2, 'yelp.com', 'James M.''s Review of Heights Apothecary - Brooklyn (5/5) on Yelp', 'I would like to add my name to the chorus of people who praise this pharmacy. I am new to the neighborhood and just happened upon it one day. It  gave me hope to see that these Mom and Pops businesses…', 'http://www.yelp.com/biz/heights-apothecary-brooklyn?hrid=YtaBRPhYBRXLpc0GWNz3Ig', '2014.09.29', 0),
(202, 2, 'yelp.com', 'Ratchada S.''s Review of Penthouse 808 - Long Island City (2/5) on Yelp', 'Pretty nice view and ambiance.. service is ok.. food is edible nothing special and pricey.. they didn''t give us ( me&my husband) the table we wanted.. they said those tables are for 4 ppl but i saw 3…', 'http://www.yelp.com/biz/penthouse-808-long-island-city?hrid=5SSWskqqGP0wSO4sbCQk9A', '2014.09.29', 0),
(203, 2, 'yelp.com', 'Johan D.''s Review of Bowery Lodge - New York (2/5) on Yelp', 'Un hôtel pas terrible du tout, mal insonorisé, chambre minuscule, lit peu confortable, wifi fonctionnant arbitrairement.\n\nLes avantages : vous êtes à Chinatown et pas loin de Canal Street (donc proche…', 'http://www.yelp.com/biz/bowery-lodge-new-york?hrid=eO6IyQpVQcAic1ml49DpXA', '2014.09.29', 0),
(204, 2, 'yelp.com', 'Jessie H.''s Review of Taqueria Downtown - Jersey City (4/5) on Yelp', 'One of the most consistently good places to eat in JC. Fun atmosphere for a casual bite and drink with friends. My favorite is the carnitas tacos and guac is great too.', 'http://www.yelp.com/biz/taqueria-downtown-jersey-city?hrid=sZbezWE3MF-BWsB84_m6nQ', '2014.09.29', 0),
(205, 2, 'yelp.com', 'Ricky P.''s Review of Chipotle - Forest Hills (1/5) on Yelp', 'We all already know how good and delicious Chipotle is so im going to redirect this review to how reluctant and unwilling the people who work in this forest hills chipotle are about giving you bigger…', 'http://www.yelp.com/biz/chipotle-forest-hills?hrid=OoAodZdWI7EkQVlMCHgCDA', '2014.09.29', 0),
(206, 2, 'yelp.com', 'Michael C.''s Review of Butter Midtown - New York (5/5) on Yelp', 'Sadly this review is a bit overdue.......My friend and I had an early dinner at Butter Midtown before attending at concert at nearby Madison Square Garden.  I am familiar with Alex Guarnaschelli from…', 'http://www.yelp.com/biz/butter-midtown-new-york?hrid=caSfI9DVksAQEWVgnk4t6g', '2014.09.29', 0),
(207, 2, 'yelp.com', 'Rico M.''s Review of Long Island Jewish Medical Center - New Hyde Park (4/5) on Yelp', 'great experience!!!! friendly staff the doctors and nurses at thks hospital are amazing..', 'http://www.yelp.com/biz/long-island-jewish-medical-center-new-hyde-park?hrid=vNA9aSH3PLMR7Y7c2G29AA', '2014.09.29', 0),
(208, 2, 'yelp.com', 'Aiden S.''s Review of Indochino Traveling Tailor - New York (1/5) on Yelp', 'Now they have a permanent location. Needless to say I will not return. Upon entering, hip hop is blasting along with staff audience(managers and employees). Not the level of sales person I trust to…', 'http://www.yelp.com/biz/indochino-traveling-tailor-new-york-2?hrid=ERJ0IAIBr0q6jzqo_wUL1w', '2014.09.29', 0),
(209, 2, 'yelp.com', 'Amy N.''s Review of Tomo Japanese Cafe - Elmhurst (3/5) on Yelp', 'This place only should get 2 1/2 stars. Went there with a friend to eat lunch. Everything except the miso soup tasted so so. Wasn''t satisfied with their food.', 'http://www.yelp.com/biz/tomo-japanese-cafe-elmhurst?hrid=fambCY1xUIlRuUDWFeiL4g', '2014.09.29', 0),
(210, 2, 'yelp.com', 'Christina T.''s Review of Bridge Pharmacy - Brooklyn (5/5) on Yelp', 'I live in California and visit Brooklyn a couple of times a year because I have lots of family there. Twice in the last two years I''ve run out of a prescription unexpectedly while I was there and had…', 'http://www.yelp.com/biz/bridge-pharmacy-brooklyn?hrid=hx2F7Hljj3yj2Q9NOpwX-A', '2014.09.29', 0),
(211, 2, 'gandul.info', 'A. J.''s Review of Shadow Boxers Bar - New York (4/5) on Yelp', 'Pretty nice vibe and layout so has potential... the music was too loud on the first floor, though and the music mixes being played were generic and kinda dull.  It wasn''t as busy as expected for open…', 'http://www.yelp.com/biz/shadow-boxers-bar-new-york?hrid=sD2pR18CckCZVdF2IWCicQ', '2014.09.29', 0),
(212, 2, 'yelp.com', 'Keith H.''s Review of Texas Star - New York (5/5) on Yelp', 'Good, Fast and if you call before you get there.  Even faster. Good eats. Wish they stayed open later.  Customer Service is great too.  Better than your average greasy spoon joint.', 'http://www.yelp.com/biz/texas-star-new-york?hrid=CYngbJdhms3PLf5LIcU1AQ', '2014.09.29', 0),
(213, 2, 'yelp.com', 'Khody A.''s Review of Razza Pizza Artigianale - Jersey City (4/5) on Yelp', 'Pizza and bread was good, but some of their rules have become absurd. They allow you to pick up, but you have to order in person for pickup.', 'http://www.yelp.com/biz/razza-pizza-artigianale-jersey-city?hrid=4zIFuVbAbPIuQ-DaMdgBtQ', '2014.09.29', 0),
(214, 2, 'yelp.com', 'A. J.''s Review of Lasagna Chelsea Restaurant - New York (2/5) on Yelp', 'For a neighborhood like Chelsea, this place is definitely not bad for the price but by no means first on the list of places to brunch.  This is the second time we came with some friends in a few…', 'http://www.yelp.com/biz/lasagna-chelsea-restaurant-new-york-2?hrid=WX-3ERpiYTzo-8sQbTKRlQ', '2014.09.29', 0),
(215, 2, 'yelp.com', 'Khody A.''s Review of Volare Restaurant - New York (4/5) on Yelp', 'Very old school feeling, but nice. Lots of complimentary bread and the pasta was delicious.', 'http://www.yelp.com/biz/volare-restaurant-new-york?hrid=CXJGaQ9yBZD8hhOEELp82A', '2014.09.29', 0),
(216, 2, 'yelp.com', 'Leon S.''s Review of Asphalt Green - New York (4/5) on Yelp', 'I want others to know how much I love my Sundance Cameo Hot Tub. At the end of each day I look forward to spending time in my hot tub, providing me time for relaxation. The design of my Cameo is…', 'http://www.yelp.com/biz/asphalt-green-new-york-2?hrid=dwgS4afp5VORHV-1qc2Bnw', '2014.09.29', 0),
(217, 2, 'yelp.com', 'Annie N.''s Review of Van Leeuwen Artisan Ice Cream - New York (2/5) on Yelp', 'I''ve had Van Leeuwen''s ice cream from their truck location in cali and that was definitely the BEST earl grey ice cream i''ve ever had... so since i passed by their cafe and was feening for earl grey…', 'http://www.yelp.com/biz/van-leeuwen-artisan-ice-cream-new-york-3?hrid=8bHm3AoUqQs5i6jK77FdCQ', '2014.09.29', 0),
(218, 2, 'yelp.com', 'Becky C.''s Review of FIX Coffee And Bakery - New York (4/5) on Yelp', 'Just met a nice employee who helped me find a place in the airport with some food at 3:30 am!', 'http://www.yelp.com/biz/fix-coffee-and-bakery-new-york?hrid=2gKuVsr8zxEBSEBnNiDeIA', '2014.09.29', 0),
(219, 2, 'yelp.com', 'Lillith T.''s Review of Brooklyn Ice Cream Factory - Brooklyn (4/5) on Yelp', 'Don''t let the line out the door intimidate you! The wait really isn''t that long. I had the strawberry ice cream on a cone. It was good but I personally prefer L&B''s strawberry ice cream better. The…', 'http://www.yelp.com/biz/brooklyn-ice-cream-factory-brooklyn-2?hrid=cfzbk764H-JwihVO7XD9Rw', '2014.09.29', 0),
(220, 2, 'yelp.com', 'Annie N.''s Review of Upstate - New York (3/5) on Yelp', 'I been dying to try this place for the longest and when i finally got to... i''m dissapointed! I had such high hopes for this place and Came here for my friends birthday last week and we ordered 5…', 'http://www.yelp.com/biz/upstate-new-york-2?hrid=Bwjcw0LmTRIlN2OhU1LrXA', '2014.09.29', 0),
(221, 2, 'yelp.com', 'Annie N.''s Review of Otafuku - New York (4/5) on Yelp', 'WHAT HAPPENED TO ALL THE CUTE JAPANESE GUYS WHO USE TO MAKE IT DOWN THE BLOCK?!?! I like that their new location is bigger but it doesn''t seem as legit anymore when i walked in and saw 5 mexicans…', 'http://www.yelp.com/biz/otafuku-new-york-2?hrid=Cho6PSlfxBt4pQ88hifzaA', '2014.09.29', 0),
(222, 3, 'gandul.info', 'S-a dat publicităţii noul clasament WTA. Ce loc ocupă SIMONA HALEP şi ce veste proastă a primit Sorana Cîrstea', 'Jucătoarea de tenis Simona Halep se menţine pe locul 2, cu 6.036 de puncte, în clasamentul WTA dat publicităţii luni, în timp ce Sorana Cîrstea a ieşit din Top 100 şi se află pe poziţia 102, cu 550 de puncte.\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/4CJN59ZDy5g/s-a-dat-publicitatii-noul-clasament-wta-ce-loc-ocupa-simona-halep-si-ce-veste-proasta-a-primit-sorana-cirstea-13354389', '2014.09.29', 0),
(223, 3, 'gandul.info', 'Aterizare de urgenţă pe Aeroportul din Timişoara din cauza depresurizării unui avion', 'O aeronavă aparţinând Blue Air a fost nevoită să aterizeze de urgenţă pe Aeroportul din Timişoara, din cauza unei depresurizări.\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/xi5FneqdwbU/aterizare-de-urgenta-pe-aeroportul-din-timisoara-din-cauza-depresurizarii-unui-avion-13354409', '2014.09.29', 0),
(224, 3, 'gandul.info', 'Noile droguri care au apărut în Capitală. Au imprimate imagini cu animale, inimi şi chiar sigle ale unor mărci auto de lux', 'Mii de pastile de droguri sintetice fabricate sub forma unor diamante sau care aveau imprimate imagini cu animale, inimi sau sigle ale unor mărci auto, ce urmau să fie vândute în cluburile din Capitală, au fost capturate în acest an de poliţişti, care au reuşit să anihileze peste 20 de grupări. \n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/NrcUPoIumcM/noile-droguri-care-au-aparut-in-capitala-au-imprimate-imagini-cu-animale-inimi-si-chiar-sigle-ale-unor-marci-auto-de-lux-13354484', '2014.09.29', 0),
(225, 3, 'gandul.info', 'Ministrul Apărării, Mircea Duşa, s-a dus la Beijing: „România doreşte să intensifice cooperarea militară cu China”', 'România este dispusă să aprofundeze cooperarea militară bilaterala cu China.\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/dVFhaqhLqhU/ministrul-apararii-mircea-dusa-s-a-dus-la-beijing-romania-doreste-sa-intensifice-cooperarea-militara-cu-china-13354235', '2014.09.29', 0),
(226, 3, 'zf.ro', 'Percheziţii la sediul firmei de pază ”Shelter Security”, într-un dosar de evaziune fiscală de 10 milioane de euro', 'Percheziţii în Bucureşti la persoane şi firme de pază suspectate de evaziune fiscală\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/O7P0TujBzSs/perchezitii-la-sediul-firmei-de-paza-shelter-security-intr-un-dosar-de-evaziune-fiscala-de-10-milioane-de-euro-13354171', '2014.09.29', 0),
(227, 3, 'gandul.info', 'Actorul Mihai Bendeac, reacţie-şoc după MOARTEA Mitropolitului Banatului: „Acest porc să ardă în Iad!”', 'Ultima oră\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/GsAmb-eJ7EU/actorul-mihai-bendeac-reactie-soc-dupa-moartea-mitropolitului-banatului-acest-porc-sa-arda-in-iad-13354228', '2014.09.29', 0),
(228, 3, 'gandul.info', '„Meitrei” - Ce vrea Călin Popescu Tăriceanu să spună cu asta', 'Romanul care i-a marcat copilăria lui Călin Popescu Tăriceanu\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/mHkmBa8kNrs/meitrei-ce-vrea-calin-popescu-tariceanu-sa-spuna-cu-asta-13354187', '2014.09.29', 0),
(229, 3, 'gandul.info', 'A murit Mitropolitul Banatului, IPS Nicolae Corneanu', 'Nicolae Corneanu a murit, duminică noapte, la reşedinţa mitropolitană.\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/LGArEzPot6Y/a-murit-mitropolitul-banatului-ips-nicolae-corneanu-13354153', '2014.09.29', 0),
(230, 3, 'gandul.info', 'Germania nu este capabilă să-şi îndeplinească toate angajamentele luate faţă de NATO', 'Deficienţele în aprovizionarea cu piese de schimb pentru avioane, dar şi penele care afectează elicopterele Marinei sunt cauza acestei insuficienţe.\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/ChlxNxTcikM/germania-nu-este-capabila-sa-si-indeplineasca-toate-angajamentele-luate-fata-de-nato-13354185', '2014.09.29', 0),
(231, 3, 'gandul.info', 'Ministrul Energiei Răzvan Nicolescu şi preşedintele ANRE, Niculae Havrileţ, participă la conferinţa „Mediafax Talks about Energy” - ediţia a XII-a', 'Ministrul delegat pentru Energie Răzvan Nicolescu şi preşedintele ANRE, Niculae Havrileţ, vor participa, marţi, la conferinţa "Mediafax Talks about Energy" - ediţia a XII-a, care va avea loc la hotelul Athenee Palace Hilton, sala Le Diplomate, începând cu ora 09.30.\n\n												\n						\n						\n											', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/jXgXje3gl-w/ministrul-energiei-razvan-nicolescu-si-presedintele-anre-niculae-havrilet-participa-la-conferinta-mediafax-talks-about-energy-editia-a-xii-a-13354646', '2014.09.29', 0),
(232, 3, 'gandul.info', 'Cât câştigă un angajat la IKEA', 'IKEA a raportat în 2013 pierderi în România pentru al treilea an consecutiv.\n										\n					\n					\n									', 'http://feedproxy.google.com/~r/gandul/MJcu/~3/OwdB-6WIGuo/cat-castiga-un-angajat-la-ikea-13354309', '2014.09.29', 0),
(233, 3, 'realitatea.net', 'Reţeta elixirului miraculos pentru refacerea florei intestinale', 'Flora intestinală cuprinde peste 400 de specii de microbi &ldquo;buni&rdquo;, care ajută digestia, dar, totodată, este un climat care poate fi afectat de diverși factori, precum alimentația dezechilibrată, administrarea antibioticelor, unele afecțiuni etc. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4ad/l/0L0Srealitatea0Bnet0Creteta0Eelixirului0Emiraculos0Epentru0Erefacerea0Eflorei0Eintestinale0I15358230Bhtml/story01.htm', '2014.09.29', 0),
(234, 3, 'realitatea.net', 'Andrei Pleșu, atacat în stil analfabet la televiziunea de casă a lui Ponta', 'ANDREI PLEȘU. După ce l-a atacat direct pe Victor Ponta, Andrei Pleșu a devenit ținta paparazziilor de la televiziunea de casă a liderului PSD. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4b2/l/0L0Srealitatea0Bnet0Candrei0Eplesu0Eandrei0Eplesu0I15358170Bhtml/story01.htm', '2014.09.29', 0),
(235, 3, 'realitatea.net', 'O aplicație care ar putea revoluționa industria auto, realizată de cercetătorii clujeni', 'Aplicaţii pentru telefoane mobile şi tablete prin care vor fi detectaţi pietonii &icirc;n trafic şi ceaţa, av&acirc;nd ca scop prevenirea accidentelor rutiere, sunt dezvoltate de cercetătorii de la Universitatea Tehnică din Cluj, &icirc;n cadrul unui proiect ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4ba/l/0L0Srealitatea0Bnet0Co0Eaplica0Eie0Ecare0Ear0Eputea0Erevolu0Eiona0Eindustria0Eauto0Erealizata0Ede0Ecercetatorii0Eclujeni0I15358190Bhtml/story01.htm', '2014.09.29', 0),
(236, 3, 'realitatea.net', 'Află ce boli se ascund în spatele oboselii', 'Este normal să resimți oboseala după o zi plină la serviciu sau după o săptăm&acirc;nă &icirc;n care ai avut foarte multe lucruri de făcut. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4bf/l/0L0Srealitatea0Bnet0Cafla0Ece0Eboli0Ese0Eascund0Ein0Espatele0Eoboselii0I15358180Bhtml/story01.htm', '2014.09.29', 0),
(237, 3, 'realitatea.net', 'Începe o nouă săptămână de şcoală, fără abecedare', 'Ultimatumul acordat de premierul, Victor Ponta, ministrului Educaţiei, Remus Pricopie, pentru a rezolva problema manualelor de clasa I a expirat deja de o săptăm&acirc;nă, &icirc;nsă nici p&acirc;nă acum, copiii nu ştiu după ce vor &icirc;nvăţa. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4c8/l/0L0Srealitatea0Bnet0Cincepe0Eo0Enoua0Esaptamana0Ede0Escoala0Efara0Eabecedare0I15358130Bhtml/story01.htm', '2014.09.29', 0),
(238, 3, 'realitatea.net', 'JIHADIȘTII din Siria au fost ATACAȚI de coaliția internațională! Ce victime s-au înregistrat', 'Coaliția internațională anti-jihadistă condusă de SUA a desfășurat &icirc;n noaptea de duminică spre luni noi atacuri asupra unor silozuri de cereale și a altor ținte &icirc;n zonele controlate de gruparea Statul Islamic (SI) &icirc;n nordul și estul Siriei, ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4cd/l/0L0Srealitatea0Bnet0Cjihadi0Etii0Edin0Esiria0Eau0Efost0Eataca0Ei0Ede0Ecoali0Eia0Einterna0Eionala0Ecate0Evictime0Es0Eau0Einregistrat0I15358140Bhtml/story01.htm', '2014.09.29', 0),
(239, 3, 'realitatea.net', 'Ţi se zbate ochiul? Cele mai serioase boli sunt anunţate de simptome banale', 'Organismul nostru se comportă ciudat uneori. Avem poftă de m&acirc;ncare prea mare sau prea scăzută, ni se zbate ochiul, ni se zbate un muşchi, ne &icirc;ngrăşăm chiar dacă abia m&acirc;ncăm cu zilele sau ne este prea sete. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4d4/l/0L0Srealitatea0Bnet0Cti0Ese0Ezbate0Eochiul0Ecele0Emai0Eserioase0Eboli0Esunt0Eanuntate0Ede0Esimptome0Ebanale0I153580A80Bhtml/story01.htm', '2014.09.29', 0),
(240, 3, 'realitatea.net', 'Au auzit strigăte dintr-un mormânt proaspăt. Ce a urmat este de necrezut', 'Caz macabru &icirc;n Grecia. O femeie ar fi murit abia după ce a fost &icirc;ngropată de vie. Muncitorii și vizitatorii de la cimitirul din Peraia, un orășel aflat &icirc;n apropiere de Salonic, au fost &icirc;ngroziți să audă strigătele disperate și ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4d9/l/0L0Srealitatea0Bnet0Cau0Eauzit0Estrigate0Edintr0Eun0Emormant0Eproaspat0Ece0Ea0Eurmat0Eeste0Ede0Enecrezut0I1535810A0Bhtml/story01.htm', '2014.09.29', 0),
(241, 3, 'realitatea.net', 'David CAMERON a anunțat cum va RETRAGE Marea Britanie din UE', 'Premierul britanic David Cameron a lăsat să se &icirc;nțeleagă faptul că este dispus să lanseze o campanie publică pentru retragerea Marii Britanii din Uniunea Europeană dacă nu va reuși să renegocieze relațiile Londrei cu Bruxellesul, după cum a relatat duminică The Telegraph. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4dd/l/0L0Srealitatea0Bnet0Cdavid0Ecameron0Ea0Eanun0Eat0Ecum0Eva0Eretrage0Emarea0Ebritanie0Edin0Eue0I153580A60Bhtml/story01.htm', '2014.09.29', 0),
(242, 3, 'realitatea.net', 'VICTOR PIȚURCĂ pleacă de la Națională. Va semna cu Al Ittihad. Clauza surpriză din contract', '&Icirc;n ciuda faptului că nimeni nu confrmă continuarea negocierilor, presa saudită ştie că viitorul antrenor al echipei&nbsp;Al Ittihad&nbsp;este actualul selecţioner al&nbsp;Rom&acirc;niei,&nbsp;Victor Piţurcă. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4e0/l/0L0Srealitatea0Bnet0Cvictor0Epi0Eurca0Epleaca0Ede0Ela0Ena0Eionala0Eva0Esemna0Ecu0Eal0Eittihad0I153580A50Bhtml/story01.htm', '2014.09.29', 0),
(243, 3, 'realitatea.net', 'Ce salariu are Ioana Petrescu, ministrul Finanţelor', 'Un număr de 269 de angajaţi din cadrul Ministerului de Finanţe, adică 20% din totalul de peste 1.300 de salariaţi din aparatul central al instituţiei, au un salariu mai mare dec&acirc;t cel &icirc;ncasat de ministrul Ioana Petrescu, arată datele centralizate de ZF pe baza ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedc4e5/l/0L0Srealitatea0Bnet0Cce0Esalariu0Eare0Eioana0Epetrescu0Eministrul0Efinantelor0I153580A40Bhtml/story01.htm', '2014.09.29', 0),
(244, 3, 'realitatea.net', 'EFECTE MIRACULOASE! Ce se întâmplă dacă bei apa caldă cu miere, pe stomacul gol', 'Majoritatea oamenilor cunosc beneficiile pentru sanatate ale mierii, insa amestecul acesteia cu apa calduta are efecte de-a dreptul miraculoase. Mierea in combinatie cu apa da nastere unui compus care mareste capacitatea de vindecare a apei in sine, iar acest lucru a fost dovedit stiintific. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedbbb0/l/0L0Srealitatea0Bnet0Cefecte0Emiraculoase0Ece0Ese0Eintampla0Edaca0Ebei0Eapa0Ecalda0Ecu0Emiere0Epe0Estomacul0Egol0I15357990Bhtml/story01.htm', '2014.09.29', 0),
(245, 3, 'realitatea.net', 'Accident violent! Motociclist zdrobit de un parapet pe soseaua Lugoj', 'Grav accident pe soseaua ce leaga Lugojul de Resita! Un motociclist s-a izbit violent de un parapet de pe marginea drumului si a ajuns in stare critica la Spitalul Judetean Timisoara. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedbbb8/l/0L0Srealitatea0Bnet0Caccident0Eviolent0Emotociclist0Ezdrobit0Ede0Eun0Eparapet0Epe0Esoseaua0Elugoj0I15357970Bhtml/story01.htm', '2014.09.29', 0),
(246, 3, 'realitatea.net', 'INCREDIBIL.Ce au făcut naționaliștii ucraineni cu statuia lui Lenin, în semn de protest', 'Naţionaliştii au dăr&acirc;mat o statuie a lui Lenin la Harkov, al doilea cel mai important oraş din Ucraina, o acţiune susţinută de către oficiali. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedbbc5/l/0L0Srealitatea0Bnet0Co0Estatuie0Ea0Elui0Elenin0Ea0Efost0Edaramata0Ede0Ecatre0Ena0Eionali0Etii0Eucraineni0I153580A0A0Bhtml/story01.htm', '2014.09.29', 0),
(247, 3, 'realitatea.net', 'Transelectrica a semnat un contract de 29,4 mililoane euro pentru retehnologizarea unei staţii', 'Compania de transport a energiei electrice Transelectrica (TEL) a semnat cu Romelectro un contract &icirc;n valoare de 29,38 milioane euro, fără TVA, pentru retehnologizarea staţiei electrice Bradu, un important nod de conexiune a reţelelor din Muntenia şi Oltenia cu cea din ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eedbbcf/l/0L0Srealitatea0Bnet0Ctranselectrica0Ea0Esemnat0Eun0Econtract0Ede0E290E40Emililoane0Eeuro0Epentru0Eretehnologizarea0Eunei0Estatii0I15357960Bhtml/story01.htm', '2014.09.29', 0),
(248, 3, 'realitatea.net', 'BREAKING NEWS: MITĂ pentru LICENŢE. PERCHEZIŢII la universităţi din Bucureşti şi Târgu Jiu', 'Mai multe percheziţii au loc, la această oră, la Universitatea Br&acirc;ncuşi, din T&acirc;rgu Jiu, şi Universitatea de Educaţie Fizică şi Sport, din Capitală. Ancheta vizează mai multe cazuri de mită. Banii ar fi fost daţi pentru obţinerea de diplome. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75d1/l/0L0Srealitatea0Bnet0Cmita0Epentru0Elicente0Eperchezitii0Ela0Euniversitatea0Etargu0Ejiu0I15357950Bhtml/story01.htm', '2014.09.29', 0),
(249, 3, 'realitatea.net', 'ÎPS NICOLAE CORNEANU a murit. Anunțul făcut de Arhiepiscopia Timișoarei', 'NICOLAE CORNEANU, Mitropolitul Banatului, a murit duminică seara, la v&acirc;rsta de 90 de ani. La Timișoara vor fi 40 de zile de doliu.&nbsp; ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75d3/l/0L0Srealitatea0Bnet0Cips0Enicolae0Ecorneanu0Ea0Emurit0Eanun0Eul0Efacut0Ede0Earhiepiscopia0Etimi0Eoarei0I15357850Bhtml/story01.htm', '2014.09.29', 0),
(250, 3, 'realitatea.net', 'ORAŞUL SECRET de sub FOCŞANI. A ieşit la iveală după CUTREMURUL DIN 77, dar COMUNIŞTII l-au ascuns', 'Lucrările executate după cutremurul din 1977 pentru construcţia noilor blocuri de locuinţe ar fi scos la iveală un altfel de Focşani. Unul subteran, cu catacombe lungi de sute de metri, folosite pentru a feri de ochii lumii sau ai autorităţilor mărfuri şi, de ce nu, oameni. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75d5/l/0L0Srealitatea0Bnet0Corasul0Esecret0Ede0Esub0Efocsani0Ea0Eiesit0Ela0Eiveala0Edupa0Ecutremurul0Edin0E770Edar0Ecomunistii0El0Eau0Eascuns0I15357870Bhtml/story01.htm', '2014.09.29', 0),
(251, 3, 'realitatea.net', 'Liberalii ieșeni: Primarul Nichita a folosit instituţiile publice pentru nunta fiicei sale', 'Liberalii ieşeni susţin că primarul PSD, Gheorghe Nichita, a folosit instituţiile publice pentru nunta fiicei sale şi cer să fie date publicităţii sumele cheltuite pentru curăţenie, at&acirc;t &icirc;n clădirea Stării Civile, c&acirc;t și &icirc;n ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75d7/l/0L0Srealitatea0Bnet0Cliberalii0Eie0Eeni0Eprimarul0Enichita0Ea0Efolosit0Einstitutiile0Epublice0Epentru0Enunta0Efiicei0Esale0I15357840Bhtml/story01.htm', '2014.09.29', 0),
(252, 3, 'realitatea.net', 'Samsung a UMILIT Apple cu un gadget din 2013. iPhone 6 costă mult, dar rezistă puțin', 'Cei de la Consumer Reports, folosind un aparat profesional de testare, au asociat nişte valori rezistenţei&nbsp;iPhone 6&nbsp;şi iPhone 6 Plus. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75d9/l/0L0Srealitatea0Bnet0Csamsung0Ea0Eumilit0Eapple0Ecu0Eun0Eprodus0Edin0E20A130Eiphone0E60Edegeaba0Ecosta0Emult0Edaca0Erezista0Epu0Ein0I15357790Bhtml/story01.htm', '2014.09.29', 0),
(253, 3, 'realitatea.net', 'Parlamentul European începe audierea celor desemnați pentru funcțiile de comisari europeni', 'Comisiile de specialitate ale Parlamentului European &icirc;ncep luni audierea comisarilor desemnați pentru următorii cinci ani și, potrivit unor surse europene, cel puțin unul dintre aceștia ar putea fi sacrificat. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75db/l/0L0Srealitatea0Bnet0Cparlamentul0Eeuropean0Eincepe0Eaudierea0Ecelor0Edesemna0Ei0Epentru0Efunc0Eiile0Ede0Ecomisari0Eeuropeni0I1535780A0Bhtml/story01.htm', '2014.09.29', 0),
(254, 3, 'realitatea.net', 'A murit în această dimineață. Accident oribil', 'In urma cu cateva momente s-a petrecut in municipiul Husi un accident grav de circulatie in urma caruia o persoana si-a pierdut viata. Soferul unei betoniere a fost prins sub autovehicul. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75dd/l/0L0Srealitatea0Bnet0Ca0Emurit0Ein0Eaceasta0Ediminea0Ea0Eaccident0Eoribil0I15357780Bhtml/story01.htm', '2014.09.29', 0),
(255, 3, 'realitatea.net', 'DOSARUL MICROSOFT, cazul care va mătura scena politică românească', 'De-a lungul timpului, Realitatea TV a abordat subiectul dosarului Microsoft, &icirc;n care sunt implicaţi şi mai mulţi foşti miniştri. Rareş Bogdan a dezbătut la Jocuri de Putere, alături de invitaţii săi, acest caz şi a venit cu dezvăluiri din dosar. ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75df/l/0L0Srealitatea0Bnet0Cdosarul0Emicrosoft0Ecazul0Ecare0Eva0Ematura0Escena0Epolitica0Eromaneasca0I15357770Bhtml/story01.htm', '2014.09.29', 0),
(256, 3, 'realitatea.net', 'Ministerul Sănătăţii, buget SUPLIMENTAT', 'Ministerul Sănătății va primi la rectificarea bugetară de marți 119,4 milioane de lei reprezent&acirc;nd alocări suplimentare destinate programelor naționale de sănătate (HIV, oncologie, TBC), finanțarea drepturilor salariale ale personalului din spitalele aflate ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75e1/l/0L0Srealitatea0Bnet0Cministerul0Esanatatii0Ebuget0Esuplimentat0I15357740Bhtml/story01.htm', '2014.09.29', 0),
(257, 3, 'sport.ro', 'Hidroelectrica, chemată la Curtea de Arbitraj din Berna pentru daune de 80 milioane de euro', 'Firma elveţiană EFT, din grupul britanic EFT, a chemat Hidroelectrica &icirc;n instanţă, la Curtea de Arbitraj din Berna, pentru a recupera daune de 80 milioane euro cauzate de denunţarea, de către producătorul de electricitate controlat de stat, a contractelor bilaterale de ', 'http://realitatea.feedsportal.com/c/32533/f/501838/s/3eed75e3/l/0L0Srealitatea0Bnet0Chidroelectrica0Echemata0Ela0Ecurtea0Ede0Earbitraj0Edin0Eberna0Epentru0Edaune0Ede0E80A0Emilioane0Ede0Eeuro0I15357710Bhtml/story01.htm', '2014.09.29', 0);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `rss`
--

CREATE TABLE IF NOT EXISTS `rss` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Salvarea datelor din tabel `rss`
--

INSERT INTO `rss` (`id`, `country_id`, `link`, `active`) VALUES
(1, 2, 'http://rss.cnn.com/rss/edition.rss', 1),
(2, 2, 'http://www.yelp.com/syndicate/area/rss.xml?loc=New+York%2C+NY', 1),
(3, 3, 'http://feeds.feedburner.com/gandul/Mjcu', 1),
(4, 3, 'http://realitatea.feedsportal.com/c/32533/fe.ed/rss.realitatea.net/stiri.xml', 1);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `slugs`
--

CREATE TABLE IF NOT EXISTS `slugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `country2` varchar(255) NOT NULL,
  `timezone` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Salvarea datelor din tabel `slugs`
--

INSERT INTO `slugs` (`id`, `country`, `slug`, `country2`, `timezone`) VALUES
(1, 'Netherlands', 'nl', 'Nederland', 4),
(2, 'United States', 'us', 'United States', 12),
(3, 'Romania', 'ro', 'România', 12),
(4, 'France', 'fr', 'Francais', 12);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
