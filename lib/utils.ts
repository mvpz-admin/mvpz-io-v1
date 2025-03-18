import * as CryptoJS from "crypto-js";
import axios from "axios";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
} from "@tabler/icons-react";

export const NCAA_SPORTS = [
  { label: "CROSS COUNTRY", value: "CROSS COUNTRY" },
  { label: "FIELD HOCKEY", value: "FIELD HOCKEY" },
  { label: "FOOTBALL", value: "FOOTBALL" },
  { label: "SOCCER", value: "SOCCER" },
  { label: "BASKETBALL", value: "BASKETBALL" },
  { label: "BOWLING", value: "BOWLING" },
  { label: "FENCING", value: "FENCING" },
  { label: "GYMNASTICS", value: "GYMNASTICS" },
  { label: "ICE HOCKEY", value: "ICE HOCKEY" },
  { label: "RIFLE", value: "RIFLE" },
  { label: "SKIING", value: "SKIING" },
  { label: "SWIMMING & DIVING", value: "SWIMMING & DIVING" },
  { label: "WRESTLING", value: "WRESTLING" },
  { label: "BASEBALL", value: "BASEBALL" },
  { label: "BEACH VOLLEYBALL", value: "BEACH VOLLEYBALL" },
  { label: "GOLFMW", value: "GOLFMW" },
  { label: "LACROSSE", value: "LACROSSE" },
  { label: "ROWING", value: "ROWING" },
  { label: "SOFTBALL", value: "SOFTBALL" },
  { label: "TENNIS", value: "TENNIS" },
  { label: "TRACK & FIELD", value: "TRACK & FIELD" },
  { label: "VOLLEYBALL", value: "VOLLEYBALL" },
  { label: "WATER POLO", value: "WATER POLO" },
];

export const SCHOOLS = [
  "Abilene Christian University",
  "Alabama Agricultural and Mechanical University",
  "Alabama State University",
  "Alcorn State University",
  "American University",
  "Appalachian State University",
  "Arizona State University",
  "Arkansas State University",
  "Auburn University",
  "Austin Peay State University",
  "Ball State University",
  "Baylor University",
  "Belmont University",
  "Bethune–Cookman University",
  "Boise State University",
  "Boston College",
  "Boston University",
  "Bowling Green State University",
  "Bradley University",
  "Brigham Young University",
  "Brown University",
  "Bryant University",
  "Bucknell University",
  "Butler University",
  "California Baptist University",
  "California Polytechnic State University",
  "California State University, Bakersfield",
  "California State University, Fresno",
  "California State University, Fullerton",
  "California State University, Long Beach",
  "California State University, Northridge",
  "California State University, Sacramento",
  "Campbell University",
  "Canisius University",
  "Central Connecticut State University",
  "Central Michigan University",
  "Charleston Southern University",
  "Chicago State University",
  "Clemson University",
  "Cleveland State University",
  "Coastal Carolina University",
  "Colgate University",
  "College of Charleston",
  "College of the Holy Cross",
  "Colorado State University",
  "Columbia University in the City of New York",
  "Coppin State University",
  "Cornell University",
  "Creighton University",
  "Dartmouth College",
  "Davidson College",
  "Delaware State University",
  "DePaul University",
  "Drake University",
  "Drexel University",
  "Duke University",
  "Duquesne University of the Holy Spirit",
  "East Carolina University",
  "Eastern Illinois University",
  "Eastern Kentucky University",
  "Eastern Michigan University",
  "Eastern Washington University",
  "East Tennessee State University",
  "Elon University",
  "Fairfield University",
  "Fairleigh Dickinson University",
  "Florida Agricultural and Mechanical University",
  "Florida Atlantic University",
  "Florida Gulf Coast University",
  "Florida International University",
  "Florida State University",
  "Fordham University",
  "Furman University",
  "Gardner–Webb University",
  "George Mason University",
  "Georgetown University",
  "Georgia Institute of Technology",
  "Georgia Southern University",
  "Georgia State University",
  "Gonzaga University",
  "Grambling State University",
  "Grand Canyon University",
  "Hampton University",
  "Harvard University",
  "High Point University",
  "Hofstra University",
  "Houston Christian University",
  "Howard University",
  "Idaho State University",
  "Illinois State University",
  "Indiana State University",
  "Indiana University Bloomington",
  "Indiana University–Purdue University Indianapolis[o]",
  "Iona University",
  "Iowa State University of Science and Technology[p]",
  "Jackson State University",
  "Jacksonville State University",
  "Jacksonville University",
  "James Madison University",
  "Kansas State University",
  "Kennesaw State University",
  "Kent State University",
  "Lafayette College",
  "Lamar University",
  "La Salle University",
  "Lehigh University",
  "Leland Stanford Junior University",
  "Liberty University",
  "Lipscomb University",
  "Long Island University",
  "Longwood University",
  "Louisiana State University and Agricultural and Mechanical College",
  "Louisiana Tech University",
  "Loyola Marymount University",
  "Loyola University Chicago",
  "Loyola University Maryland",
  "Manhattan College",
  "Marist College",
  "Marquette University",
  "Marshall University",
  "McNeese State University",
  "Mercer University",
  "Merrimack College",
  "Miami University",
  "Michigan State University",
  "Middle Tennessee State University",
  "Mississippi State University for Agriculture and Applied Science[v]",
  "Mississippi Valley State University",
  "Missouri State University",
  "Monmouth University",
  "Montana State University",
  "Morehead State University",
  "Morgan State University",
  "Mount Saint Mary's University",
  "Murray State University",
  "New Jersey Institute of Technology",
  "New Mexico State University",
  "Niagara University",
  "Nicholls State University",
  "Norfolk State University",
  "North Carolina Agricultural and Technical State University",
  "North Carolina Central University",
  "North Carolina State University",
  "North Dakota State University of Agriculture and Applied Sciences",
  "Northeastern University",
  "Northern Arizona University",
  "Northern Illinois University",
  "Northern Kentucky University",
  "Northwestern State University of Louisiana",
  "Northwestern University",
  "Oakland University",
  "Oklahoma State University–Stillwater",
  "Old Dominion University",
  "Oral Roberts University",
  "Oregon State University",
  "Pepperdine University",
  "Portland State University",
  "Prairie View A&M University",
  "Presbyterian College",
  "Princeton University",
  "Providence College",
  "Purdue University",
  "Purdue University Fort Wayne",
  "Quinnipiac University",
  "Radford University",
  "Rider University",
  "Robert Morris University",
  "Rutgers University–New Brunswick",
  "Sacred Heart University",
  "Saint Bonaventure University",
  "Saint Francis University",
  "Saint John's University",
  "Saint Joseph's University",
  "Saint Louis University",
  "Saint Mary's College of California",
  "Saint Peter's University",
  "Sam Houston State University",
  "Samford University",
  "San Diego State University",
  "San Jose State University",
  "Santa Clara University",
  "Seattle University",
  "Seton Hall University",
  "Siena College",
  "South Carolina State University",
  "South Dakota State University",
  "Southeast Missouri State University",
  "Southeastern Louisiana University",
  "Southern University and A&M College",
  "Southern Illinois University Carbondale",
  "Southern Illinois University Edwardsville",
  "Southern Methodist University",
  "Southern Utah University",
  "State University of Iowa[ah]",
  "State University of New York at Albany[ai]",
  "State University of New York at Binghamton[aj]",
  "State University of New York at Buffalo[al]",
  "State University of New York at Stony Brook[an]",
  "Stephen F. Austin State University[ao]",
  "Stetson University",
  "Syracuse University",
  "Temple University",
  "Tennessee State University",
  "Tennessee Technological University",
  "Texas A&M University",
  "Texas A&M University–Corpus Christi",
  "Texas Christian University",
  "Texas Southern University",
  "Texas State University",
  "Texas Tech University",
  "The Citadel, The Military College of South Carolina[be]",
  "The College of William and Mary in Virginia",
  "The George Washington University",
  "The Ohio State University",
  "The Ohio University",
  "The Pennsylvania State University",
  "The University of Akron",
  "The University of Alabama",
  "The University of Mississippi",
  "The University of New Mexico",
  "The University of Tennessee at Chattanooga",
  "The University of Tennessee at Martin",
  "The University of Tennessee, Knoxville",
  "The University of Texas at Arlington",
  "The University of Texas at Austin",
  "The University of Texas at El Paso",
  "The University of Texas at San Antonio",
  "The University of Texas Rio Grande Valley",
  "The University of Tulsa",
  "The University of Vermont and State Agricultural College",
  "Towson University",
  "Troy University",
  "Tulane University of Louisiana",
  "United States Air Force Academy",
  "United States Military Academy",
  "United States Naval Academy",
  "University of Alabama at Birmingham",
  "University of Arizona",
  "University of Arkansas",
  "University of Arkansas at Little Rock",
  "University of Arkansas at Pine Bluff",
  "University of California, Berkeley",
  "University of California, Davis",
  "University of California, Irvine",
  "University of California, Los Angeles",
  "University of California, Riverside",
  "University of California, Santa Barbara",
  "University of Central Arkansas",
  "University of Central Florida",
  "University of Cincinnati",
  "University of Colorado Boulder",
  "University of Connecticut",
  "University of Dayton",
  "University of Delaware",
  "University of Denver",
  "University of Detroit Mercy",
  "University of Evansville",
  "University of Florida",
  "University of Georgia",
  "University of Hawaiʻi at Mānoa",
  "University of Houston",
  "University of Idaho",
  "University of Illinois Chicago",
  "University of Illinois Urbana-Champaign",
  "University of Kansas",
  "University of Kentucky",
  "University of Louisiana at Lafayette",
  "University of Louisiana at Monroe",
  "University of Louisville",
  "University of Maine",
  "University of Maryland, Baltimore County",
  "University of Maryland, College Park",
  "University of Maryland Eastern Shore",
  "University of Massachusetts Amherst",
  "University of Massachusetts Lowell",
  "University of Memphis",
  "University of Miami",
  "University of Michigan",
  "University of Minnesota",
  "University of Missouri–Columbia[bb]",
  "University of Missouri–Kansas City",
  "University of Montana",
  "University of Nebraska–Lincoln",
  "University of Nebraska Omaha",
  "University of Nevada, Las Vegas",
  "University of Nevada, Reno",
  "University of New Hampshire",
  "University of New Orleans",
  "University of North Alabama",
  "University of North Carolina at Asheville",
  "University of North Carolina at Chapel Hill",
  "University of North Carolina at Charlotte",
  "University of North Carolina at Greensboro",
  "University of North Carolina at Wilmington",
  "University of North Dakota",
  "University of Northern Colorado",
  "University of Northern Iowa",
  "University of North Florida",
  "University of North Texas",
  "University of Notre Dame du Lac",
  "University of Oklahoma",
  "University of Oregon",
  "University of Pennsylvania",
  "University of Pittsburgh",
  "University of Portland",
  "University of Rhode Island",
  "University of Richmond",
  "University of San Diego",
  "University of San Francisco",
  "University of South Alabama",
  "University of South Carolina",
  "University of South Carolina Upstate",
  "University of South Dakota",
  "University of Southern California",
  "University of Southern Mississippi",
  "University of South Florida",
  "University of the Incarnate Word",
  "University of the Pacific",
  "University of Toledo",
  "University of Utah",
  "University of Virginia",
  "University of Washington",
  "University of Wisconsin–Green Bay",
  "University of Wisconsin–Madison",
  "University of Wisconsin–Milwaukee",
  "University of Wyoming",
  "Utah State University",
  "Utah Valley University",
  "Valparaiso University",
  "Vanderbilt University",
  "Villanova University",
  "Virginia Commonwealth University",
  "Virginia Military Institute[be]",
  "Virginia Polytechnic Institute and State University",
  "Wagner College",
  "Wake Forest University",
  "Washington State University",
  "Weber State University",
  "Western Carolina University",
  "Western Illinois University",
  "Western Kentucky University",
  "Western Michigan University",
  "West Virginia University",
  "Wichita State University",
  "William Marsh Rice University",
  "Winthrop University",
  "Wofford College",
  "Wright State University",
  "Xavier University",
  "Yale University",
  "Youngstown State University",
];

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export function callAPI(props) {
  const { endpoint, method, body } = props;
  const options = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };
  let URL = `${process.env.NEXT_PUBLIC_APP_URL}/api${endpoint}`;
  return fetch(URL, options)
    .then((response) => {
      return response.json();
    })
    .then(async (responseJSON) => responseJSON)
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export function downloadFile(url, token) {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("content-type", "application/json");

    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: token,
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "image/svg",
      },
      redirect: "follow",
    })
      .then(async (response) => {
        if (response) {
          const resBlob = await response.blob();
          resolve(!!resBlob ? URL.createObjectURL(resBlob) : null);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(null);
      });
  });
}

export function uploadImageToBackblaze(
  file: File,
  filename: string,
  uploadUrl: string,
  authToken: string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileReader = new FileReader();

      fileReader.readAsBinaryString(file);
      fileReader.onload = async (f) => {
        const sha1 = CryptoJS.SHA1(
          CryptoJS.enc.Latin1.parse(fileReader.result)
        );
        const response = await axios.post(uploadUrl, file, {
          headers: {
            Authorization: authToken,
            "X-Bz-File-Name": filename,
            "Content-Type": "b2/x-auto",
            "X-Bz-Content-Sha1": sha1,
            "X-Bz-Info-Author": "unknown",
          },
        });
        if (response) {
          resolve(true);
        }
      };
    } catch (err) {
      reject(err);
    }
  });
}

export function convertToBase36(number) {
  const base36 = number.toString(36).toUpperCase();
  return base36.padStart(3, "0");
}

export async function downloadUserImages(_user, authToken, url) {
  let downloadedImages = {} as any;
  if (_user.image) {
    if (_user.image.includes("http")) {
      downloadedImages.profileImage = _user.image;
    } else {
      downloadedImages.profileImage = await downloadFile(
        `${url}/file/mvpz-user-private/${_user.image}`,
        authToken
      );
    }
  }
  if (_user.bannerImage) {
    downloadedImages.bannerImage = await downloadFile(
      `${url}/file/mvpz-user-private/${_user.bannerImage}`,
      authToken
    );
  }
  if (_user.cardImage) {
    downloadedImages.cardImage = await downloadFile(
      `${url}/file/mvpz-user-private/${_user.cardImage}`,
      authToken
    );
  }
  return downloadedImages;
}

export const getOrganizationName = async () => {
  let reponse = await callAPI({
    endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/organizations`,
  });

  if (reponse) {
    return reponse?.names;
  } else {
    return [];
  }
};

export const remainingEligibility = [
  {
    label: "First-Year",
    value: 1,
  },
  {
    label: "Second-Year",
    value: 2,
  },
  {
    label: "Third-Year",
    value: 3,
  },
  {
    label: "Fourth-Year",
    value: 4,
  },
  {
    label: "Fifth-Year",
    value: 5,
  },
  {
    label: "First-Year (Redshirt)",
    value: 6,
  },
  {
    label: "Second-Year (Redshirt)",
    value: 7,
  },
  {
    label: "Third-Year (Redshirt)",
    value: 8,
  },
  {
    label: "Fourth-Year (Redshirt)",
    value: 9,
  },
  {
    label: "Graduate",
    value: 10,
  },
];

export let SportPositions = [
  {
    "id": "Top Order Batter",
    "label": "Top Order Batter"
  },
  {
    "id": "Middle Order Batter",
    "label": "Middle Order Batter"
  },
  {
    "id": "Bowler",
    "label": "Bowler"
  },
  {
    "id": "Batting All-rounder",
    "label": "Batting All-rounder"
  },
  {
    "id": "Bowling All-rounder",
    "label": "Bowling All-rounder"
  },
  {
    "id": "Coach",
    "label": "Coach"
  },
  {
    "id": "Umpire",
    "label": "Umpire"
  }
]


export const classOptions = [
  {
    label: "Freshman",
    value: "Freshman",
  },
  {
    label: "Sophomore",
    value: "Sophomore",
  },
  {
    label: "Junior",
    value: "Junior",
  },
  {
    label: "Senior",
    value: "Senior",
  },
  {
    label: "Fifth-Year",
    value: "Fifth-Year",
  },
  {
    label: "First-Year (Redshirt)",
    value: "First-Year (Redshirt)",
  },
  {
    label: "Second-Year (Redshirt)",
    value: "Second-Year (Redshirt)",
  },
  {
    label: "Third-Year (Redshirt)",
    value: "Third-Year (Redshirt)",
  },
  {
    label: "Fourth-Year (Redshirt)",
    value: "Fourth-Year (Redshirt)",
  },
  {
    label: "Graduate",
    value: "Graduate",
  },
];

export const socialMediaList = [
  {
    url: "https://www.instagram.com/mvpz_sport?igsh=b2N1bjBpMHQxdDdk",
    type: "instagram",
    icon: IconBrandInstagram,
  },
  {
    url: "https://twitter.com/mvpz_sport",
    type: "twitter",
    icon: IconBrandX,
  },
  {
    url: "https://medium.com/@_MVPz",
    type: "medium",
    icon: IconBrandMedium,
  },
  {
    url: "https://www.linkedin.com/company/89859823",
    type: "linkedin",
    icon: IconBrandLinkedin,
  },
  {
    url: "https://www.youtube.com/channel/UCxh_9u-MXEQfQ41_etQpQQQ",
    type: "youtube",
    icon: IconBrandYoutube,
  },
  {
    url: "https://discord.com/invite/BeknQdEsbx",
    type: "discord",
    icon: IconBrandDiscord,
  },
  {
    url: "mailTo:team@mvpz.io",
    type: "mail",
    icon: IconMail,
  },
];
