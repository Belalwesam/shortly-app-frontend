import axios from "axios";

export const fetchLinks = async () => {
  try {
    const {
      data: { links },
    } = await axios.get(`${process.env.REACT_APP_API_URL}/links`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return links.map((link: any) => link);
  } catch (error) {
    console.log(error);
  }
};

export const shortenLink = async (originalLink: string) => {
  if (localStorage.getItem("token")) {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/store`,
      data: {
        original_url: originalLink,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.data.link;
      })
      .catch((err) => console.log(err));
  } else {
    return;
  }
};

export const deleteLink = async (id: number) => {
  try {
    axios.delete(`${process.env.REACT_APP_API_URL}/link/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
