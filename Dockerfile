FROM python

RUN pip install flask \
                pyDes \
                pymongo

WORKDIR /root
CMD ["python", "init.py"]
CMD ["python", "main.py"]
